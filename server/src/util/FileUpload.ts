import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50mb
  storage: multer.diskStorage({
    destination(req, file, callback) {
      const uploadDir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      callback(null, uploadDir);
    },
    filename(req, file, callback) {
      callback(null, `${file.originalname}-${Date.now()}`);
    },
  }),
});

export default upload;
