require('dotenv').config();
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const pool = require('./src/utils/database');
const PlaylistRepository = require('./src/repositories/PlaylistRepository');

const playlistRepository = new PlaylistRepository(pool);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (targetEmail, content) => {
  const mailOptions = {
    from: 'OpenMusic <noreply@openmusic.com>',
    to: targetEmail,
    subject: 'Ekspor Playlist Anda',
    text: 'Terlampir hasil ekspor playlist Anda.',
    attachments: [
      {
        filename: 'playlist.json',
        content,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

const init = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  const queue = 'export:playlists';

  await channel.assertQueue(queue, {
    durable: true,
  });

  console.log(`Consumer berjalan dan menunggu pesan di queue ${queue}...`);

  channel.consume(queue, async (message) => {
    if (message !== null) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
        console.log(`Menerima permintaan ekspor playlist ${playlistId} ke ${targetEmail}`);

        const playlistData = await playlistRepository.getSongsFromPlaylist(playlistId);
        const emailContent = JSON.stringify({ playlist: playlistData }, null, 2);

        await sendEmail(targetEmail, emailContent);
        console.log('Email berhasil dikirim');
      } catch (error) {
        console.error('Gagal memproses pesan:', error);
      } finally {
        channel.ack(message);
      }
    }
  });
};

init();