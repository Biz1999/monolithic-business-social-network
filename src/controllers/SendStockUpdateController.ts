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
    const fs = require("fs");
    let data = fs.readFileSync("src/utils/blingRequests.json");
    data = JSON.parse(data); //parse the JSON
    data = [...data, newData];
    fs.writeFileSync(
      "src/utils/blingRequests.json",
      JSON.stringify(data, null, 2)
    );
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
