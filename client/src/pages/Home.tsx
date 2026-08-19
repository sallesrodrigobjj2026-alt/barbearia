import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import { canAddToCart, cartLabel, formatBRL } from "@/lib/storefront";
import type { CartItem, Product } from "@shared/commerce/types";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  Scissors,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type TabId = "inicio" | "servicos" | "loja";

const heroImage = "/manus-storage/corte-e-navalha-hero_b322c0e4.jpg";
const logoImage = "/manus-storage/corte-e-navalha-logo_3c585a61.png";
const galleryImages = [
  "/manus-storage/corte-e-navalha-bancada_08d2f095.jpg",
  "/manus-storage/corte-e-navalha-cadeira_69d912e2.jpg",
  "/manus-storage/corte-e-navalha-fachada_db8fba0f.jpg",
];
const productFallbacks = [
  ["/manus-storage/pomada-corte-navalha-1_6e988e6e.jpg", "/manus-storage/pomada-corte-navalha-2_580ca111.jpg"],
  ["/manus-storage/oleo-corte-navalha-1_5a50b96c.jpg", "/manus-storage/oleo-corte-navalha-2_a35cbc86.jpg"],
];
const demoAddress = "Rua da Navalha, 245 — Vila Madalena, São Paulo — SP";
const demoMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demoAddress)}`;
const demoWhatsAppUrl = `https://wa.me/5511999999999?text=${encodeURIComponent("Olá! Quero agendar um horário na Corte & Navalha.")}`;
const services = [
  ["01", "Corte Degradê", "Navalhado nas laterais, acabamento preciso na tesoura.", "R$ 45", "40 min"],
  ["02", "Corte Social", "Clássico, limpo e alinhado para acompanhar todos os dias.", "R$ 35", "30 min"],
  ["03", "Barba Completa", "Modelagem, toalha quente e finalização no detalhe.", "R$ 30", "25 min"],
  ["04", "Corte + Barba", "A experiência completa, do caimento à finalização.", "R$ 65", "60 min"],
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/15 bg-[#1e1c19]">
        <img src={logoImage} alt="Símbolo Corte & Navalha" className="h-full w-full object-cover" />
      </div>
      <span className="display text-[1.55rem] leading-none tracking-[.06em] text-[#f0eadc]">
        Corte <span className="text-[#d9634c]">&amp;</span> Navalha
      </span>
    </div>
  );
}

function Header({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  const { itemCount, openCart } = useCart();
  const tabs: Array<[TabId, string]> = [["inicio", "Início"], ["servicos", "Serviços"], ["loja", "Loja"]];
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#161513]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => onChange("inicio")} className="pressable" aria-label="Ir para início"><Brand /></button>
        <nav className="hidden rounded-full border border-white/10 bg-white/[.035] p-1 lg:flex" aria-label="Navegação principal">
          {tabs.map(([id, label]) => <button key={id} onClick={() => onChange(id)} className={`pressable rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[.13em] ${active === id ? "bg-[#f0eadc] text-[#1a1815]" : "text-[#b9b09e] hover:text-[#f0eadc]"}`}>{label}</button>)}
        </nav>
        <button onClick={openCart} className="pressable relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-[#1e1c19] text-[#f0eadc] hover:border-[#d9634c]" aria-label={`Abrir carrinho, ${cartLabel(itemCount)}`}>
          <ShoppingBag size={18} />{itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#d9634c] px-1 text-[9px] font-bold text-white">{itemCount}</span>}
        </button>
      </div>
    </header>
  );
}

function MobileNav({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  const { itemCount, openCart } = useCart();
  const tabs: Array<[TabId, string, typeof Sparkles]> = [["inicio", "Início", Sparkles], ["servicos", "Serviços", Scissors], ["loja", "Loja", ShoppingBag]];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#1a1815]/95 px-2 pb-[max(.55rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden" aria-label="Navegação móvel">
      <div className="mx-auto flex max-w-md justify-around">
        {tabs.map(([id, label, Icon]) => <button key={id} onClick={() => onChange(id)} className={`pressable flex min-w-[72px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold ${active === id ? "text-[#e56d54]" : "text-[#a89f90]"}`}><Icon size={19} /><span>{label}</span></button>)}
        <button onClick={openCart} className="pressable relative flex min-w-[72px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold text-[#a89f90]" aria-label={`Abrir carrinho, ${cartLabel(itemCount)}`}><ShoppingBag size={19} /><span>Bolsa</span>{itemCount > 0 && <span className="absolute right-3 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#d9634c] px-1 text-[9px] text-white">{itemCount}</span>}</button>
      </div>
    </nav>
  );
}

function Inicio({ navigate }: { navigate: (tab: TabId) => void }) {
  return (
    <main className="pb-24 lg:pb-0">
      <section className="grain relative isolate min-h-[calc(100svh-70px)] overflow-hidden border-b border-white/10 lg:min-h-[620px]">
        <div className="absolute inset-0"><img src={heroImage} alt="Interior da Corte & Navalha" className="h-full w-full object-cover object-[64%_center] opacity-70" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,17,15,.96)_0%,rgba(18,17,15,.79)_38%,rgba(18,17,15,.22)_80%)]" /></div>
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-70px)] max-w-[1280px] flex-col justify-end px-4 pb-12 pt-16 sm:px-6 lg:min-h-[620px] lg:px-8 lg:pb-20">
          <div className="max-w-xl"><div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#e7ded0]"><span className="h-1.5 w-1.5 rounded-full bg-[#d9634c]" />Barbearia contemporânea</div><h1 className="fade-up delay-1 display mt-5 max-w-[11ch] text-[clamp(4.2rem,15vw,8.7rem)] leading-[.79] text-[#f4eee3]">A técnica mora no <span className="text-[#e0644c]">detalhe.</span></h1><p className="fade-up delay-2 mt-6 max-w-md text-sm leading-6 text-[#d1c7b7] sm:text-base">Cortes precisos, barba bem cuidada e produtos para manter o resultado quando você sai da cadeira.</p><div className="fade-up delay-2 mt-7 flex flex-wrap gap-3"><button onClick={() => navigate("servicos")} className="pressable inline-flex items-center gap-2 rounded-full bg-[#d9634c] px-5 py-3 text-sm font-bold text-white">Ver serviços <ArrowDownRight size={17} /></button><button onClick={() => navigate("loja")} className="pressable inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/10 px-5 py-3 text-sm font-bold text-[#f0eadc] hover:border-white/45">Produtos da casa <ArrowRight size={17} /></button></div></div>
          <div className="mt-10 flex max-w-xl items-center gap-4 border-t border-white/15 pt-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#b6ad9e]"><span>Seu horário. Seu estilo.</span><span className="h-px flex-1 bg-white/15" /><span>Sem enrolação.</span></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20"><div className="cut-rule mb-8" /><p className="text-[10px] font-bold uppercase tracking-[.23em] text-[#d9634c]">A experiência</p><h2 className="display mt-3 text-[clamp(2.7rem,7vw,4.4rem)] leading-[.88]">Cuidado que aparece.</h2><div className="mt-7 grid gap-3 md:grid-cols-3">{[[Scissors, "Corte com intenção", "Caimento pensado para o seu tipo de cabelo, rotina e presença."], [Sparkles, "Ritual de barba", "Toalha quente, navalha e acabamento que respeita o seu rosto."], [Package, "Leve o resultado", "Produtos selecionados para o cuidado continuar em casa."]].map(([Icon, title, text], index) => { const CardIcon = Icon as typeof Scissors; return <article className={`rounded-[.8rem] border border-white/10 p-6 ${index === 1 ? "bg-[#e9e0d0] text-[#1c1a16]" : "bg-[#201e1a]"}`} key={String(title)}><CardIcon size={25} className={index === 1 ? "text-[#c84e38]" : "text-[#e16a53]"} /><p className={`mt-8 text-[10px] font-bold uppercase tracking-[.19em] ${index === 1 ? "text-[#766c5f]" : "text-[#aca291]"}`}>0{index + 1}</p><h3 className="display mt-2 text-3xl leading-none">{String(title)}</h3><p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-[#5d564c]" : "text-[#b9b09e]"}`}>{String(text)}</p></article>; })}</div></section>
      <section className="border-y border-white/10 bg-[#1c1a17] py-14 lg:py-20"><div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8"><div className="cut-rule mb-8" /><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.23em] text-[#d9634c]">O espaço</p><h2 className="display mt-3 text-[clamp(2.7rem,7vw,4.4rem)] leading-[.88]">Feito para desacelerar.</h2></div><span className="hidden text-xs font-bold uppercase tracking-[.15em] text-[#aa9f91] sm:block">Passe para ver</span></div><div className="mt-7 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible">{galleryImages.map((source, index) => <figure className={`relative h-[330px] min-w-[245px] overflow-hidden rounded-[.8rem] border border-white/10 sm:h-[410px] sm:min-w-0 ${index === 1 ? "sm:translate-y-8" : ""}`} key={source}><img src={source} alt={["Detalhes da bancada", "Cadeira de barbeiro", "Fachada da Corte & Navalha"][index]} className="h-full w-full object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-12 text-[10px] font-bold uppercase tracking-[.2em] text-[#e7ded0]">0{index + 1} / {index === 0 ? "Detalhes" : index === 1 ? "Cadeira" : "Chegada"}</figcaption></figure>)}</div></div></section>
      <section className="mx-auto grid max-w-[1280px] gap-5 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24"><div className="rounded-[.8rem] bg-[#e9e0d0] p-7 text-[#211f1b] sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9e3d2c]">Onde estamos <span className="ml-1 text-[#6b6258]">/ demonstração</span></p><h2 className="display mt-3 max-w-[9ch] text-[3.2rem] leading-[.86]">Perto do seu próximo corte.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-[#655d53]">{demoAddress}. Dados fictícios para demonstrar o acesso à rota e ao agendamento em um toque.</p><div className="mt-7 flex flex-wrap gap-3"><a href={demoMapsUrl} target="_blank" rel="noreferrer" className="pressable inline-flex items-center gap-2 rounded-full bg-[#211f1b] px-4 py-2.5 text-xs font-bold text-[#f0eadc]"><MapPin size={16} />Ver rota</a><a href={demoWhatsAppUrl} target="_blank" rel="noreferrer" className="pressable inline-flex items-center gap-2 rounded-full border border-[#211f1b]/20 px-4 py-2.5 text-xs font-bold"><Phone size={16} />Falar no WhatsApp</a></div></div><div className="relative min-h-[290px] overflow-hidden rounded-[.8rem] border border-white/10 bg-[#22201c] p-7"><div className="absolute -right-14 -top-10 h-56 w-56 rounded-full border-[22px] border-[#d9634c]/20" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d9634c] text-white"><MapPin size={19} /></div><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#aea493]">Endereço de demonstração</p><p className="display mt-2 text-4xl leading-none">Rua da Navalha,<br />245 · São Paulo.</p><div className="mt-5 flex items-center gap-2 text-xs text-[#bcb2a1]"><Clock3 size={15} />Ter–Sáb · 09h às 20h</div></div></div></div></section>
    </main>
  );
}

function Servicos({ navigate }: { navigate: (tab: TabId) => void }) {
  return <main className="mx-auto min-h-[calc(100svh-70px)] max-w-[1280px] px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><aside className="lg:sticky lg:top-28 lg:self-start"><p className="text-[10px] font-bold uppercase tracking-[.23em] text-[#d9634c]">Tabela de serviços</p><h1 className="display mt-4 text-[clamp(4rem,9vw,7.5rem)] leading-[.8]">Do seu jeito, <span className="text-[#d9634c]">bem feito.</span></h1><p className="mt-6 max-w-sm text-sm leading-6 text-[#bdb3a2]">Escolha sua experiência e tenha um horário dedicado a você. O WhatsApp abaixo usa um contato fictício para esta demonstração.</p><a href={demoWhatsAppUrl} target="_blank" rel="noreferrer" className="pressable mt-7 inline-flex items-center gap-2 rounded-full bg-[#d9634c] px-5 py-3 text-sm font-bold text-white"><CalendarDays size={17} />Quero agendar</a><button onClick={() => navigate("loja")} className="pressable mt-5 block text-xs font-bold uppercase tracking-[.15em] text-[#c6baaa] underline decoration-[#d9634c] underline-offset-8">Conheça os produtos da casa</button></aside><section>{services.map(([number, name, description, price, duration]) => <article key={name} className="border-b border-white/12 py-6 first:border-t"><div className="flex gap-4"><span className="pt-1 text-[10px] font-bold tracking-[.18em] text-[#d9634c]">{number}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h2 className="display text-[2.3rem] leading-none sm:text-4xl">{name}</h2><span className="display whitespace-nowrap text-3xl leading-none text-[#d9634c]">{price}</span></div><p className="mt-2 max-w-lg text-sm leading-6 text-[#b9af9f]">{description}</p><div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#9f9586]"><Clock3 size={14} />{duration}<span className="mx-1 h-1 w-1 rounded-full bg-[#d9634c]" />Disponível</div></div></div></article>)}</section></div><section className="mt-12 rounded-[1.5rem] border border-white/10 bg-[#201e1a] p-6 sm:mt-16 sm:p-8"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#d9634c]">Antes do horário</p><div className="mt-5 grid gap-5 sm:grid-cols-3">{["Chegue cinco minutos antes.", "Traga referências, se quiser.", "Saia com o produto certo."].map(item => <p className="flex gap-3 text-sm leading-6 text-[#c7bdad]" key={item}><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#d9634c]/15 text-[#e16a53]"><Check size={12} /></span>{item}</p>)}</div></section></main>;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem, loading } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const images = product.images.length > 1 ? product.images.map(image => image.url) : [...product.images.map(image => image.url), ...productFallbacks[index % productFallbacks.length]].slice(0, 2);
  const selectedImage = images[imageIndex] || productFallbacks[index % productFallbacks.length][0];
  const variant = product.variants[0];
  const changeImage = (offset: number) => setImageIndex(current => (current + offset + images.length) % images.length);
  return <article className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#201e1a]"><div className="group relative aspect-square overflow-hidden bg-[#292620]"><img src={selectedImage} alt={`${product.title} — foto ${imageIndex + 1}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />{images.length > 1 && <><button onClick={() => changeImage(-1)} aria-label="Foto anterior" className="pressable absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white"><ChevronLeft size={18} /></button><button onClick={() => changeImage(1)} aria-label="Próxima foto" className="pressable absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white"><ChevronRight size={18} /></button><div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">{images.map((_, dot) => <span key={dot} className={`h-1.5 rounded-full ${imageIndex === dot ? "w-5 bg-[#e9e0d0]" : "w-1.5 bg-white/40"}`} />)}</div></>}</div><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d9634c]">{product.productType || "Cuidado"}</p><div className="mt-2 flex gap-3"><h3 className="display min-w-0 flex-1 text-3xl leading-none">{product.title}</h3><span className="display whitespace-nowrap text-2xl leading-none text-[#e56d54]">{formatBRL(product.priceRange.min.amount)}</span></div><p className="mt-3 min-h-10 text-sm leading-5 text-[#b8ae9f]">{product.description || "Seleção da Corte & Navalha para o seu ritual diário."}</p><button disabled={!variant || !canAddToCart(variant.availableForSale, loading)} onClick={() => variant && addItem(variant.id).catch(() => toast.error("Não foi possível adicionar este item agora."))} className="pressable mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e9e0d0] px-4 py-3 text-xs font-bold text-[#1e1b17] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"><Plus size={16} />{loading ? "Adicionando..." : variant?.availableForSale ? "Adicionar à bolsa" : "Indisponível"}</button></div></article>;
}

function Loja() {
  const input = useMemo(() => ({ first: 6 }), []);
  const { data: products = [], isLoading, isError } = trpc.commerce.products.list.useQuery(input);
  return <main className="mx-auto min-h-[calc(100svh-70px)] max-w-[1280px] px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20"><div className="grid gap-8 border-b border-white/10 pb-9 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.23em] text-[#d9634c]">Produtos da barbearia</p><h1 className="display mt-4 text-[clamp(4rem,9vw,7.5rem)] leading-[.8]">O ritual continua <span className="text-[#d9634c]">em casa.</span></h1></div><p className="max-w-lg text-sm leading-6 text-[#bdb3a2]">Fórmulas e ferramentas escolhidas para você manter textura, hidratação e acabamento entre uma visita e outra.</p></div><section className="pt-10">{isLoading && <div className="grid gap-4 sm:grid-cols-2"><div className="aspect-square animate-pulse rounded-[1.4rem] bg-white/7" /><div className="aspect-square animate-pulse rounded-[1.4rem] bg-white/7" /></div>}{isError && <div className="rounded-[1.4rem] border border-[#d9634c]/30 bg-[#d9634c]/10 p-7"><p className="display text-3xl">A vitrine está sendo preparada.</p><p className="mt-2 text-sm leading-6 text-[#cdbcb2]">Atualize a página em instantes. O catálogo volta assim que a loja concluir a conexão.</p></div>}{!isLoading && !isError && products.length === 0 && <div className="rounded-[1.4rem] border border-white/10 bg-[#201e1a] p-7"><Package size={24} className="text-[#d9634c]" /><p className="display mt-5 text-3xl">Catálogo chegando.</p><p className="mt-2 max-w-sm text-sm leading-6 text-[#b9af9f]">Os primeiros itens estão sendo organizados na vitrine. Volte em breve.</p></div>}{products.length > 0 && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div>}</section></main>;
}

function CartItemRow({ item }: { item: CartItem }) {
  const { loading, removeItem, updateQuantity } = useCart();
  return <li className="flex gap-3 py-4"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#2a2722]">{item.image ? <img src={item.image.url} alt={item.productTitle} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[#d9634c]"><Package size={22} /></div>}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><p className="display truncate text-2xl leading-none">{item.productTitle}</p>{item.variantTitle !== "Default Title" && <p className="mt-1 text-[10px] uppercase tracking-[.13em] text-[#a89e8f]">{item.variantTitle}</p>}</div><button aria-label={`Remover ${item.productTitle}`} disabled={loading} onClick={() => removeItem(item.lineId).catch(() => toast.error("Não foi possível remover o item."))} className="pressable grid h-7 w-7 place-items-center rounded-full text-[#aea493]"><X size={16} /></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-full border border-white/12"><button disabled={loading} onClick={() => updateQuantity(item.lineId, item.quantity - 1).catch(() => toast.error("Não foi possível atualizar a quantidade."))} className="pressable grid h-7 w-7 place-items-center"><Minus size={13} /></button><span className="w-6 text-center text-xs font-bold">{item.quantity}</span><button disabled={loading} onClick={() => updateQuantity(item.lineId, item.quantity + 1).catch(() => toast.error("Não foi possível atualizar a quantidade."))} className="pressable grid h-7 w-7 place-items-center"><Plus size={13} /></button></div><strong className="display text-xl text-[#e56d54]">{formatBRL(item.lineTotal.amount)}</strong></div></div></li>;
}

function CartDrawer() {
  const { cart, closeCart, isOpen, itemCount, loading, proceedToCheckout } = useCart();
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50"><button aria-label="Fechar carrinho" onClick={closeCart} className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" /><aside role="dialog" aria-modal="true" aria-label="Sua bolsa" className="absolute inset-x-0 bottom-0 flex max-h-[86svh] flex-col rounded-t-[1.7rem] border border-white/10 bg-[#1e1c19] sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[430px] sm:rounded-l-[1.7rem] sm:rounded-tr-none"><div className="flex items-center justify-between border-b border-white/10 px-5 py-5"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d9634c]">Sua seleção</p><h2 className="display mt-1 text-4xl leading-none">Bolsa <span className="text-[#d9634c]">/ {itemCount}</span></h2></div><button onClick={closeCart} aria-label="Fechar" className="pressable grid h-10 w-10 place-items-center rounded-full border border-white/15"><X size={19} /></button></div><div className="min-h-0 flex-1 overflow-y-auto px-5"><ul>{cart?.items.map(item => <CartItemRow item={item} key={item.lineId} />)}</ul>{!cart?.items.length && <div className="flex min-h-64 flex-col items-center justify-center text-center"><div className="grid h-14 w-14 place-items-center rounded-full bg-[#d9634c]/12 text-[#e56d54]"><ShoppingBag size={23} /></div><p className="display mt-5 text-3xl">Sua bolsa está leve.</p><p className="mt-2 max-w-[240px] text-sm leading-6 text-[#aaa091]">Escolha um produto da casa para levar o cuidado com você.</p></div>}</div><div className="border-t border-white/10 p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#b9af9f]">Subtotal</span><strong className="display text-3xl">{cart ? formatBRL(cart.subtotal.amount) : formatBRL(0)}</strong></div><button disabled={!itemCount || loading} onClick={proceedToCheckout} className="pressable mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d9634c] px-5 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{loading ? "Atualizando..." : "Continuar para pagamento"}<ArrowRight size={17} /></button><p className="mt-3 text-center text-[10px] leading-4 text-[#82796e]">Você conclui o pagamento no ambiente seguro da loja.</p></div></aside></div>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const navigate = (tab: TabId) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="min-h-screen bg-[#161513] text-[#f0eadc]"><Header active={activeTab} onChange={navigate} />{activeTab === "inicio" && <Inicio navigate={navigate} />}{activeTab === "servicos" && <Servicos navigate={navigate} />}{activeTab === "loja" && <Loja />}<footer className="border-t border-white/10 bg-[#12110f] px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pb-10"><div className="mx-auto flex max-w-[1280px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><Brand /><div className="text-sm leading-6 text-[#928878]"><p>© 2026 Corte & Navalha.</p><p>Técnica, presença e cuidado sem enrolação.</p></div></div></footer><MobileNav active={activeTab} onChange={navigate} /><CartDrawer /></div>;
}
