import { Request, Response } from "express";
import ip from "ip";

import { CreateImageService } from "../services/CreateImageService";
import { ShowSaudePillarDataService } from "../services/ShowSaudePillarDataService";

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
  async handle(request: Request, response: Response) {
    const files = request.files as Photo[];
    const { colaborador_id } = request;
    let post_id: string;
    if (request.query && request.query.post_id) {
      post_id = (request.query as any).post_id;
    }

    const createImageService = new CreateImageService();
    const showSaudePillarDataService = new ShowSaudePillarDataService();

    const now = Date.now();
    const promises = files.map(async (file) => {
      const uri = `http://177.190.201.227:3000/cdn/${colaborador_id}/${file.filename}`;
      return await createImageService.execute({ post_id, uri });
    });

    await Promise.all(promises);

    return new Promise(function () {
      setTimeout(() => {
        showSaudePillarDataService.execute({ post_id }).then((photos) => {
          return response.status(201).json(photos);
        });
      }, 0);
    });
  }
}

export { CreateImageController };
