import multer from 'multer'

export const fileFormat = {
    image: ['image/png', 'image/jpg','image/jpeg', 'image/jif', 'image/jfif', 'image/gif'],
}

export const HME = (err, req, res, next) => {
    if (err) {
        res.status(400).json({ message: "multer error", err })
    } else {
        next()
    }
}

export const useMulter = (customValidation = fileFormat.image) => {
    const storage = multer.diskStorage({});
    function fileFilter(req, file, cb) {
        if (!customValidation.includes(file.mimetype)) {
            cb("Invalid format", false)
        }
        else {
            cb(null, true);
        }
    }

    const upload = multer({ fileFilter, storage })
    return upload;
}