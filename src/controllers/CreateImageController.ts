import { Request, Response } from "express";
import ip from "ip";

import { CreateImageService } from "../services/CreateImageService";
import { CreateSPimageService } from "../services/CreateSPimageService";

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

class CreateImageController {
  handle(request: Request, response: Response) {
    const files = request.files as Photo[];
    const { colaborador_id } = request;
    let post_id: string;
    if (request.query && request.query.post_id) {
      post_id = (request.query as any).post_id;
    }

    const createImageService = new CreateImageService();
    const createSPimageService = new CreateSPimageService();

    const now = Date.now();
    files.forEach(async (file) => {
      const uri = `http://192.168.11.79:8000/cdn/${colaborador_id}/${file.filename}`;
      try {
        Promise.all([
          createImageService.execute({ post_id, uri }),
          new Promise((r) => setTimeout(r, 500)),
          createSPimageService.execute({
            colaborador_id,
            post_id,
            filename: file.filename,
            path: file.path,
            now,
          }),
        ]);
      } catch (error) {
        throw new Error(error);
      }
    });

    return response.status(201).json("Upload concluído");
  }
}

export { CreateImageController };
