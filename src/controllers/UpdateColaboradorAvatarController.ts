import { Request, Response } from "express";
import ip from "ip";
import { UpdateColaboradorAvatarService } from "../services/UpdateColaboradorAvatarService";

export interface Avatar {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class UpdateColaboradorAvatarController {
  async handle(request: Request, response: Response) {
    const updateColaboradorAvatarService = new UpdateColaboradorAvatarService();
    const file = request.file as Avatar;
    const { colaborador_id } = request;

    const avatar = `http://192.168.11.79:8000/cdn/${colaborador_id}/${file.filename}`;
    try {
      const saveAvatar = await updateColaboradorAvatarService.execute({
        colaborador_id,
        avatar,
      });

      return response.status(200).json(saveAvatar);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { UpdateColaboradorAvatarController };
