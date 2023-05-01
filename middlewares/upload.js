const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const CLIENT_MAX_BODY_SIZE = "100mb";

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: CLIENT_MAX_BODY_SIZE,
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
