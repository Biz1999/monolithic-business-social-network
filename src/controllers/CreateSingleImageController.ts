import { Request, Response } from "express";
import ip from "ip";
import { CreateSingleImageService } from "../services/CreateSingleImageService";
import { CreateSPSingleimageService } from "../services/CreateSPSingleImageService";

export interface Photo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class CreateSingleImageController {
  async handle(request: Request, response: Response) {
    const createSingleImageService = new CreateSingleImageService();
    const createSPSingleImageService = new CreateSPSingleimageService();

    const file = request.file as Photo;
    const { colaborador_id } = request;
    let interno_id: string;
    if (request.query && request.query.interno_id) {
      interno_id = (request.query as any).interno_id;
    }

    const comprovante = `http://177.190.201.227:3000/cdn/${colaborador_id}/${file.filename}`;
    try {
      const saveComprovante = await createSingleImageService.execute({
        interno_id,
        comprovante,
      });

      createSPSingleImageService.execute({
        colaborador_id,
        interno_id,
        filename: file.filename,
        path: file.path,
        now: Date.now(),
      });

      return response.json(saveComprovante);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { CreateSingleImageController };
