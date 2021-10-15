import { Deposito } from "../dtos/PSIStock";
import api from "./api";

class SendStockUpdateService {
  async execute(deposito: Deposito) {
    try {
      api.defaults.headers[
        "authorization"
      ] = `Bearer ${process.env.ACCESS_TOKEN}`;

      const { data }: any = await api.get(
        `/products/${deposito.product_sku}?stock_stores=${deposito.store_slug}`
      );
      const in_stock = Number(data.in_stock);

      if (deposito.quantity === in_stock) {
        console.log("igual", data, deposito);
        return;
      }
      if (deposito.quantity < in_stock) {
        console.log("menor", data, deposito);
        return;
      }

      deposito.quantity = Number(deposito.quantity) - in_stock;
      Promise.resolve(
        await api
          .post("/stock_updates", deposito)
          .then((response) =>
            console.log(
              response.status,
              "O que enviei:",
              deposito,
              "O que recebi para comparação:",
              data
            )
          )
          .catch((error) => console.log(error.response.data))
      );
    } catch (error: any) {
      console.log(error.response.data);
      // throw new Error(error.message);
    }
  }
}

export { SendStockUpdateService };
