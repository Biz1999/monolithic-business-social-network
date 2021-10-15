export interface Deposito {
  quantity: Number;
  type: "in" | "out";
  product_sku: string;
  store_slug: string;
}
