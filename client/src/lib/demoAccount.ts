export const DEMO_SHOPIFY_ACCOUNT_URL = "https://cortenavalha-mdmsjtct-wildflower-feather-epiwpasw.myshopify.com/account";

export type DemoOrder = {
  id: string;
  createdAt: string;
  total: string;
  items: string;
};

export const demoOrders: DemoOrder[] = [
  { id: "CN-1042", createdAt: "18 ago. 2026", total: "R$ 64,80", items: "Pomada Modeladora · Óleo para Barba" },
  { id: "CN-1028", createdAt: "03 ago. 2026", total: "R$ 32,90", items: "Shampoo de Uso Diário" },
];

export function isValidDemoLogin(email: string, password: string) {
  return /^\S+@\S+\.\S+$/.test(email.trim()) && password.trim().length >= 6;
}

export function accountDisplayName(email: string) {
  return email.trim().split("@")[0]?.replace(/[._-]/g, " ") || "Cliente";
}
