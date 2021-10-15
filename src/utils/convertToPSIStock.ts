import { Product } from "../dtos/BlingStock";
import { Deposito } from "../dtos/PSIStock";
import { storeSlugConvert } from "./storeSlugConvert";

export function convertToPsiStock(product: Product) {
  const stocks: Deposito[] = [];

  product.depositos.forEach((deposito) => {
    if (
      deposito.deposito.id !== "7546975469" &&
      deposito.deposito.id !== "7693996839" &&
      deposito.deposito.id !== "11725458208"
    ) {
      stocks.push({
        quantity: Number(deposito.deposito.saldo),
        type: "in",
        product_sku: product.codigo,
        store_slug: storeSlugConvert(deposito.deposito.id),
      });
    }
  });

  return stocks;
}
