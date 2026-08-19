export type DisplayProduct = {
  id: string;
  title: string;
  description: string;
  price: string;
  availability: boolean;
};

export function formatBRL(amount: string | number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(amount));
}

export function cartLabel(itemCount: number) {
  return itemCount === 1 ? "1 item" : `${itemCount} itens`;
}

export function canAddToCart(availableForSale: boolean, loading: boolean) {
  return availableForSale && !loading;
}
