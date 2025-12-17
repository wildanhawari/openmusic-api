const ValidationError = require('../errors/ValidationError');

class UploadValidator {
  static validateImageHeaders(mimeType) {
    if (!mimeType || !mimeType.startsWith('image/')) {
      throw new ValidationError('File harus berupa gambar');
    }
  }

  static validateImageSize(size) {
    const maxSize = 512000;

    if (size > maxSize) {
      throw new ValidationError('Ukuran file tidak boleh lebih dari 512KB');
    }
  }
}

module.exports = UploadValidator;