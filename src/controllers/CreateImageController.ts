import { Request, Response } from "express";
import ip from "ip";

import { CreateImageService } from "../services/CreateImageService";

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

    const createImageService = new CreateImageService();
    const post_id = "075630f2-444e-4511-a153-6141f805ed2f";

    files.forEach(async (file) => {
      const uri = `http://${ip.address()}:3000/cdn/d482ddd3-7016-4e8f-818c-a21cc46fb3ef/${
        file.filename
      }`;
      try {
        await createImageService.execute({ post_id, uri });
      } catch (error) {
        throw new Error(error.message);
      }
    });

    return response.json("Upload concluído");
  }
}

export { CreateImageController };
