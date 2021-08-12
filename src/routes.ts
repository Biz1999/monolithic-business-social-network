import { Router } from "express";
import fs from "fs";
import path from "path";
import mime from "mime";
import multer from "multer";
import { CreateColaboradorController } from "./controllers/CreateColaboradorController";
import { CreatePilarController } from "./controllers/CreatePilarController";
import { CreateSaudeController } from "./controllers/CreateSaudeController";
import { CreateConhecimentoController } from "./controllers/CreateConhecimentoController";
import { CreateInternoController } from "./controllers/CreateInternoController";
import { CreateImageController } from "./controllers/CreateImageController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `images/${"d482ddd3-7016-4e8f-818c-a21cc46fb3ef"}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, `images/${"d482ddd3-7016-4e8f-818c-a21cc46fb3ef"}`);
  },
  filename: (req, file, cb) => {
    const filename = path.parse(file.originalname).name;
    cb(null, `${Date.now()}${filename}.${mime.extension(file.mimetype)}`);
  },
});
const router = Router();
const upload = multer({ storage });

const createColaboradorController = new CreateColaboradorController();
const createPilarController = new CreatePilarController();
const createSaudeController = new CreateSaudeController();
const createConhecimentoController = new CreateConhecimentoController();
const createInternoController = new CreateInternoController();
const createImageController = new CreateImageController();

router.post("/colaboradores", createColaboradorController.handle);
router.post("/pilares", createPilarController.handle);
router.post("/pilares/saude", createSaudeController.handle);
router.post(
  "/pilares/saude/photos",
  upload.array("image"),
  createImageController.handle
);
router.post("/pilares/conhecimento", createConhecimentoController.handle);
router.post("/pilares/interno", createInternoController.handle);

export { router };
