export interface Deposito {
  deposito: {
    id: string;
    nome: string;
    saldo: string;
  };
}

export interface Product {
  id: string;
  codigo: string;
  nome: string;
  depositos: Deposito[];
}
