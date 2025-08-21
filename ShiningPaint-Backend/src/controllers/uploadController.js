const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// @desc    Upload single file
// @route   POST /api/upload/single
// @access  Private
const uploadSingle = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const file = req.files.file;
    const { folder = 'general' } = req.body;

    // Validate file type
    const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        error: 'File type not allowed'
      });
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExtension}`;
    const uploadPath = path.join('uploads', folder);
    const filePath = path.join(uploadPath, fileName);

    // Create directory if it doesn't exist
    try {
      await fs.access(uploadPath);
    } catch {
      await fs.mkdir(uploadPath, { recursive: true });
    }

    // Move file to upload directory
    await file.mv(filePath);

    // Return file information
    const fileInfo = {
      originalName: file.name,
      fileName: fileName,
      filePath: filePath,
      fileUrl: `${req.protocol}://${req.get('host')}/${filePath}`,
      mimeType: file.mimetype,
      size: file.size,
      folder: folder
    };

    res.status(200).json({
      success: true,
      data: fileInfo
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files || !req.files.files) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
    const { folder = 'general' } = req.body;
    const uploadedFiles = [];

    // Validate file types
    const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          error: `File type not allowed: ${file.name}`
        });
      }
    }

    // Create directory if it doesn't exist
    const uploadPath = path.join('uploads', folder);
    try {
      await fs.access(uploadPath);
    } catch {
      await fs.mkdir(uploadPath, { recursive: true });
    }

    // Process each file
    for (const file of files) {
      // Generate unique filename
      const fileExtension = path.extname(file.name);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(uploadPath, fileName);

      // Move file to upload directory
      await file.mv(filePath);

      // Add file information
      uploadedFiles.push({
        originalName: file.name,
        fileName: fileName,
        filePath: filePath,
        fileUrl: `${req.protocol}://${req.get('host')}/${filePath}`,
        mimeType: file.mimetype,
        size: file.size,
        folder: folder
      });
    }

    res.status(200).json({
      success: true,
      data: uploadedFiles
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete file
// @route   DELETE /api/upload/:fileName
// @access  Private
const deleteFile = async (req, res, next) => {
  try {
    const { fileName } = req.params;
    const { folder = 'general' } = req.query;

    const filePath = path.join('uploads', folder, fileName);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    // Delete file
    await fs.unlink(filePath);

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get file info
// @route   GET /api/upload/:fileName
// @access  Private
const getFileInfo = async (req, res, next) => {
  try {
    const { fileName } = req.params;
    const { folder = 'general' } = req.query;

    const filePath = path.join('uploads', folder, fileName);

    // Check if file exists and get stats
    try {
      const stats = await fs.stat(filePath);
      
      const fileInfo = {
        fileName: fileName,
        filePath: filePath,
        fileUrl: `${req.protocol}://${req.get('host')}/${filePath}`,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        folder: folder
      };

      res.status(200).json({
        success: true,
        data: fileInfo
      });

    } catch {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  deleteFile,
  getFileInfo
};
