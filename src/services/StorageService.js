const fs = require('fs');
const path = require('path');
const config = require('../utils/config');

class StorageService {
  constructor(folder) {
    this.folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const pathName = path.resolve(this.folder, filename);

    return new Promise((resolve, reject) => {
      fs.writeFile(pathName, file.buffer, (error) => {
        if (error) {
          return reject(error);
        }
        const fileUrl = `http://${config.app.host}:${config.app.port}/uploads/images/${filename}`;
        return resolve(fileUrl);
      });
    });
  }
}

module.exports = StorageService;