import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { singlepdf } from "../Controller/fileupload.js";

// Helper to get the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  
const upload = multer({ storage: storage });

//Take an Input PDF for RAG
router.post("/one", upload.single("pdf"), singlepdf);
  

// router.post("/many", upload.array("CVs"), multipleCv);

export default router;
