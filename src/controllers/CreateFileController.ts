import { Request, Response } from "express";
import ip from "ip";

import { CreateFileService } from "../services/CreateFileService";
import { CreateSPDocumentService } from "../services/CreateSPDocumentService";

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
    const createSPDocumentService = new CreateSPDocumentService();

    const now = Date.now();
    files.forEach(async (file) => {
      const uri = `http://177.190.201.227:3000/cdn/${colaborador_id}/${file.filename}`;
      try {
        Promise.all([
          createFileService.execute({ conhecimento_id, uri }),
          new Promise((r) => setTimeout(r, 500)),
          createSPDocumentService.execute({
            colaborador_id,
            conhecimento_id,
            filename: file.filename,
            path: file.path,
            now,
          }),
        ]);
      } catch (error) {
        throw new Error("Upload não efetuado");
      }
    });

    return response.status(201).json("Upload concluído");
  }
}

export { CreateFileController };
