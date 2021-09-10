import { Request, Response } from "express";
import { CreateDocumentService } from "../services/CreateDocumentService";
import { CreateSPDocumentService } from "../services/CreateSPDocumentService";

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class CreateDocumentController {
  async handle(request: Request, response: Response) {
    const createDocumentService = new CreateDocumentService();
    const createSPDocumentService = new CreateSPDocumentService();

    const file = request.file as File;
    const { colaborador_id } = request;
    let conhecimento_id: string;
    if (request.query && request.query.conhecimento_id) {
      conhecimento_id = (request.query as any).conhecimento_id;
    }

    const conhecimentoFile = `http://177.190.201.227:3000/cdn/${colaborador_id}/${file.filename}`;
    try {
      const saveComprovante = await createDocumentService.execute({
        conhecimento_id,
        fileuri: conhecimentoFile,
      });

      createSPDocumentService.execute({
        colaborador_id,
        conhecimento_id,
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

export { CreateDocumentController };
