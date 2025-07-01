const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('src/public/images/members')); // Đường dẫn lưu ảnh
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});
const storageEvent = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('src/public/images/events')); // Đường dẫn lưu ảnh
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});
const storagePost = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('src/public/images/posts')); // Đường dẫn lưu ảnh
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});
const storageDesign = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('src/public/images/designs')); // Đường dẫn lưu ảnh
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('src/public/images/members')); // Đường dẫn lưu ảnh
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// Bộ lọc file (tuỳ chọn)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận ảnh định dạng jpeg, jpg, png'), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

const uploadEvent = multer({
    storage: storageEvent,  // 🔧 Thiếu chữ `storage:`
    fileFilter
});

const uploadAvatar = multer({
    storage: storageAvatar,  // 🔧 Thiếu chữ `storage:`
    fileFilter
});
const uploadPost = multer({
    storage: storagePost,  // 🔧 Thiếu chữ `storage:`
    fileFilter
});
const uploadDesign = multer({
    storage: storageDesign,  // 🔧 Thiếu chữ `storage:`
    fileFilter
});

module.exports = {upload, uploadEvent, uploadAvatar,uploadPost,uploadDesign};
