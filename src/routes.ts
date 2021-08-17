import { Router } from "express";
import fs from "fs";
import path from "path";
import mime from "mime";
import multer from "multer";
import { ensurePagination } from "./middlewares/ensurePagination";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CreateColaboradorController } from "./controllers/CreateColaboradorController";
import { CreatePilarController } from "./controllers/CreatePilarController";
import { CreateSaudeController } from "./controllers/CreateSaudeController";
import { CreateConhecimentoController } from "./controllers/CreateConhecimentoController";
import { CreateInternoController } from "./controllers/CreateInternoController";
import { CreateImageController } from "./controllers/CreateImageController";
import { AuthenticateColaboradorController } from "./controllers/AuthenticateColaboradorController";
import { CreateSingleImageController } from "./controllers/CreateSingleImageController";
import { SendColaboradorDataController } from "./controllers/SendColaboradorDataController";
import { UpdateColaboradorAvatarController } from "./controllers/UpdateColaboradorAvatarController";
import { ListAllAvailablePostsController } from "./controllers/ListAllAvailablePostsController";
import { ListAllDocumentsByIdController } from "./controllers/ListAllDocumentsByIdController";
import { ListAllColaboradoresPostsController } from "./controllers/ListAllColaboradoresPostsController";
import { ListColaboradoresScoresController } from "./controllers/ListColaboradoresScoresController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `../public/${req.colaborador_id}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = path.parse(file.originalname).name;
    cb(null, `${Date.now()}${filename}.${mime.extension(file.mimetype)}`);
  },
});
const router = Router();
const upload = multer({ storage });

const createColaboradorController = new CreateColaboradorController();
const sendColaboradorDataController = new SendColaboradorDataController();
const authenticateColaboradorController =
  new AuthenticateColaboradorController();
const createPilarController = new CreatePilarController();
const createSaudeController = new CreateSaudeController();
const createConhecimentoController = new CreateConhecimentoController();
const createInternoController = new CreateInternoController();
const createImageController = new CreateImageController();
const createSingleImageController = new CreateSingleImageController();
const updateColaboradorAvatarController =
  new UpdateColaboradorAvatarController();
const listAllAvailablePostsController = new ListAllAvailablePostsController();
const listAllDocumentsByIdController = new ListAllDocumentsByIdController();
const listAllColaboradoresPostsController =
  new ListAllColaboradoresPostsController();
const listColaboradoresScoresController =
  new ListColaboradoresScoresController();

router.get(
  "/colaborador",
  ensureAuthenticated,
  sendColaboradorDataController.handle
);

router.patch(
  "/colaborador/avatar",
  ensureAuthenticated,
  upload.single("image"),
  updateColaboradorAvatarController.handle
);
router.get(
  "/colaboradores/isAvailable",
  ensureAuthenticated,
  ensurePagination,
  listAllAvailablePostsController.handle
);
router.get(
  "/colaboradores/scores",
  ensureAuthenticated,
  ensurePagination,
  listColaboradoresScoresController.handle
);

router.post("/colaboradores", createColaboradorController.handle);

router.post("/login", authenticateColaboradorController.handle);

router.post("/pilares", createPilarController.handle);
router.post(
  "/pilares/saude",
  ensureAuthenticated,
  createSaudeController.handle
);
router.post(
  "/pilares/saude/photos",
  ensureAuthenticated,
  upload.array("image"),
  createImageController.handle
);
router.get(
  "/pilares/saude/photos",
  ensureAuthenticated,
  ensurePagination,
  listAllColaboradoresPostsController.handle
);
router.post(
  "/pilares/conhecimento",
  ensureAuthenticated,
  createConhecimentoController.handle
);
router.get(
  "/pilares/conhecimento/documents",
  ensureAuthenticated,
  listAllDocumentsByIdController.handle
);
router.post(
  "/pilares/interno",
  ensureAuthenticated,
  createInternoController.handle
);
router.patch(
  "/pilares/interno/photo",
  ensureAuthenticated,
  upload.single("image"),
  createSingleImageController.handle
);

export { router };
