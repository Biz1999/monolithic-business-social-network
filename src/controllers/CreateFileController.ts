import { Request, Response } from "express";
import ip from "ip";

import { CreateFileService } from "../services/CreateFileService";
import { ShowConhecimentoPillarDataService } from "../services/ShowConhecimentoPillarDataService";

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

class CreateFileController {
  handle(request: Request, response: Response) {
    const files = request.files as Photo[];
    const { colaborador_id } = request;
    let conhecimento_id: string;
    if (request.query && request.query.conhecimento_id) {
      conhecimento_id = (request.query as any).conhecimento_id;
    }

    const createFileService = new CreateFileService();
    const showConhecimentoPillarDataService =
      new ShowConhecimentoPillarDataService();

    const now = Date.now();
    const promises = files.map(async (file) => {
      const uri = `http://177.190.201.227:3000/cdn/${colaborador_id}/${file.filename}`;
      return await createFileService.execute({ conhecimento_id, uri });
    });

    Promise.all(promises);

    return new Promise(function () {
      setTimeout(() => {
        showConhecimentoPillarDataService
          .execute({ conhecimento_id })
          .then((files) => {
            return response.status(201).json(files);
          });
      }, 0);
    });
  }
}

export { CreateFileController };
