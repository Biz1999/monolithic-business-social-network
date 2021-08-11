import { Router } from "express";
import multer from "multer";
import { CreateColaboradorController } from "./controllers/CreateColaboradorController";
import { CreatePilarController } from "./controllers/CreatePilarController";
import { CreateSaudeController } from "./controllers/CreateSaudeController";
import { CreateConhecimentoController } from "./controllers/CreateConhecimentoController";
import { CreateInternoController } from "./controllers/CreateInternoController";
import mime from "mime";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${Date.now()}.${mime.extension(file.mimetype)}`);
  },
});
const router = Router();
const upload = multer({ storage });

const createColaboradorController = new CreateColaboradorController();
const createPilarController = new CreatePilarController();
const createSaudeController = new CreateSaudeController();
const createConhecimentoController = new CreateConhecimentoController();
const createInternoController = new CreateInternoController();

router.post("/colaboradores", createColaboradorController.handle);
router.post("/pilares", createPilarController.handle);
router.post("/pilares/saude", createSaudeController.handle);
router.post("/pilares/saude/photos", upload.array("image"), (req, res) => {
  const { files } = req;
  console.log(files);
  res.send("parabéns");
});
router.post("/pilares/conhecimento", createConhecimentoController.handle);
router.post("/pilares/interno", createInternoController.handle);

export { router };
