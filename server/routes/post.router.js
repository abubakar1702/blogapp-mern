import express from "express";
import {
  getPosts,
  addPost,
  uploadImage,
  singlePost,
  deletePost,
  getImage,
  editPost
} from "../controllers/post.controller.js";
const router = express.Router();
import multer from "multer";
import path from "path";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'D:/Blog App/server/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/posts", getPosts);
router.post("/", addPost);
router.post("/upload", upload.single('file'), uploadImage);
router.get("/images/:filename", getImage)
router.get("/:id", singlePost)
router.delete("/:id", deletePost)
router.put("/edit/:id", editPost)

export default router;
