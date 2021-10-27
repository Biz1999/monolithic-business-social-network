import { Request, Response } from "express";
import { Product } from "../dtos/BlingStock";
import { Deposito } from "../dtos/PSIStock";
import { SendStockUpdateService } from "../services/SendStockUpdateService";
import { convertToPsiStock } from "../utils/convertToPSIStock";

class SendStockUpdateController {
  async handle(request: Request, response: Response) {
    // console.log(request);
    // console.log(new Date());
    const newData = JSON.parse(request.body.data);
    const estoque: Product = newData.retorno.estoques[0].estoque;

    const sendStockUpdateService = new SendStockUpdateService();

    const stocks_to_update = convertToPsiStock(estoque);

    stocks_to_update.forEach((stock, index) =>
      setTimeout(
        async () => await sendStockUpdateService.execute(stock),
        2000 * index
      )
    );

    return response.status(200).json("Enviado com sucesso!");
  }
}

export { SendStockUpdateController };
