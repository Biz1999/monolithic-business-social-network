import { Router } from "express";
import { CreateColaboradorController } from "./controllers/CreateColaboradorController";
import { CreatePilarController } from "./controllers/CreatePilarController";
import { CreateSaudeController } from "./controllers/CreateSaudeController";
import { CreateConhecimentoController } from "./controllers/CreateConhecimentoController";
import { CreateInternoController } from "./controllers/CreateInternoController";

const router = Router();

const createColaboradorController = new CreateColaboradorController();
const createPilarController = new CreatePilarController();
const createSaudeController = new CreateSaudeController();
const createConhecimentoController = new CreateConhecimentoController();
const createInternoController = new CreateInternoController();

router.post("/colaboradores", createColaboradorController.handle);
router.post("/pilares", createPilarController.handle);
router.post("/pilares/saude", createSaudeController.handle);
router.post("/pilares/conhecimento", createConhecimentoController.handle);
router.post("/pilares/interno", createInternoController.handle);

export { router };
