const multer = require('multer');
const path = require('path');

// Use memory storage for buffer-based approach
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Check file type using mimetype instead of extension
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only images are allowed'), false);
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return cb(new Error('File size too large. Maximum 5MB allowed'), false);
    }
    
    cb(null, true);
};

const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;
