import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/f1adcff1-6734-4ea4-8383-ce7874b09d52/files/b99d2fa2-c896-41b7-9dba-0c2a622fc618.jpg";
const WATCH_IMG = "https://cdn.poehali.dev/projects/f1adcff1-6734-4ea4-8383-ce7874b09d52/files/5c481c39-33c9-4e5e-b6ca-367dd4d38e3e.jpg";
const SKIN_IMG = "https://cdn.poehali.dev/projects/f1adcff1-6734-4ea4-8383-ce7874b09d52/files/2f875bf5-d93a-4661-98e5-906ef9a16d7f.jpg";

type Page = "home" | "catalog" | "about" | "blog" | "forum" | "support" | "cart" | "checkout";

const PRODUCTS = [
  { id: 1, name: "Хронограф Noir", desc: "Швейцарский механический хронограф с сапфировым стеклом", price: 285000, category: "watches", image: WATCH_IMG, badges: ["хит", "проверено"], rating: 4.9, downloads: 142, seller: "LuxWatch", date: "22 Апр 2026", version: "v2.1" },
  { id: 2, name: "Serum d'Or", desc: "Сыворотка с золотыми микрочастицами и гиалуроновой кислотой", price: 18500, category: "beauty", image: SKIN_IMG, badges: ["новинка", "проверено"], rating: 4.8, downloads: 89, seller: "BeautyPro", date: "20 Апр 2026", version: "v1.3" },
  { id: 3, name: "Velvet Essence", desc: "Нишевый парфюм на основе уда и розы с Дамаска", price: 24900, category: "perfume", image: HERO_IMG, badges: ["эксклюзив"], rating: 5.0, downloads: 234, seller: "MaisonParfum", date: "18 Апр 2026", version: "v1.0" },
  { id: 4, name: "Сапфировый браслет", desc: "Браслет из белого золота с натуральными сапфирами", price: 142000, category: "jewelry", image: WATCH_IMG, badges: ["лимитед", "проверено"], rating: 4.7, downloads: 31, seller: "GoldMaster", date: "15 Апр 2026", version: "v1.0" },
  { id: 5, name: "Royal Elixir", desc: "Омолаживающий крем с экстрактом икры и пептидами", price: 31200, category: "beauty", image: SKIN_IMG, badges: ["хит"], rating: 4.9, downloads: 178, seller: "BeautyPro", date: "12 Апр 2026", version: "v2.0" },
  { id: 6, name: "Grand Tourbillon", desc: "Турбийон с ручной гравировкой, лимитированная серия 50 шт", price: 520000, category: "watches", image: WATCH_IMG, badges: ["премиум", "лимитед"], rating: 5.0, downloads: 12, seller: "LuxWatch", date: "10 Апр 2026", version: "FINAL" },
  { id: 7, name: "Ambre Mystique", desc: "Восточный аромат с нотами амбры, мускуса и сандала", price: 19800, category: "perfume", image: HERO_IMG, badges: ["хит"], rating: 4.6, downloads: 315, seller: "MaisonParfum", date: "8 Апр 2026", version: "v3.2" },
  { id: 8, name: "Золотая нить", desc: "Колье из жёлтого золота 750 пробы с бриллиантами", price: 87000, category: "jewelry", image: SKIN_IMG, badges: ["эксклюзив", "проверено"], rating: 4.8, downloads: 55, seller: "GoldMaster", date: "5 Апр 2026", version: "v1.1" },
];

const SIDEBAR_CATS = [
  { key: "all",     label: "Все товары",    icon: "LayoutGrid", count: 320 },
  { key: "watches", label: "Часы",           icon: "Watch",      count: 86 },
  { key: "jewelry", label: "Украшения",      icon: "Gem",        count: 124 },
  { key: "beauty",  label: "Красота",        icon: "Sparkles",   count: 67 },
  { key: "perfume", label: "Парфюмерия",     icon: "Droplets",   count: 43 },
];

const SIDEBAR_TOOLS = [
  "Как выбрать часы?",
  "Уход за украшениями",
  "Гид по ароматам",
  "Лучшие новинки",
  "Продвижение товара",
];

const BLOG_POSTS = [
  { id: 1, title: "Искусство швейцарского часового дела", date: "28 апр 2026", category: "Часы", image: WATCH_IMG, excerpt: "Погружение в мир точности и мастерства, где каждая деталь — произведение искусства." },
  { id: 2, title: "Ритуал ухода за кожей класса люкс", date: "22 апр 2026", category: "Красота", image: SKIN_IMG, excerpt: "Как выстроить утренний ритуал с продуктами, достойными королевского двора." },
  { id: 3, title: "История великих парфюмерных домов", date: "15 апр 2026", category: "Парфюмерия", image: HERO_IMG, excerpt: "От Chanel до современных нишевых брендов — путь аромата сквозь столетия." },
];

const FORUM_TOPICS = [
  { id: 1, title: "Как отличить оригинал от реплики?", replies: 34, views: 1240, category: "Советы", author: "dimkon", date: "22 Апр 2026" },
  { id: 2, title: "Лучшие ароматы для деловых встреч", replies: 19, views: 876, category: "Парфюмерия", author: "Truhot", date: "20 Апр 2026" },
  { id: 3, title: "Уход за швейцарскими часами", replies: 45, views: 2100, category: "Часы", author: "TeeZ", date: "18 Апр 2026" },
  { id: 4, title: "Какие украшения актуальны в 2026?", replies: 28, views: 1530, category: "Украшения", author: "CrazyX", date: "15 Апр 2026" },
];

const REVIEWS = [
  { author: "Анна М.", text: "Часы пришли быстро, упакованы идеально. Сертификат подлинности в комплекте!", badges: ["хит", "проверено"], rating: 5.0 },
  { author: "Сергей К.", text: "Парфюм — просто восторг. Стойкость потрясающая, буду заказывать ещё.", badges: ["эксклюзив"], rating: 5.0 },
];

const PAYMENT_METHODS = ["Яндекс.Касса", "PayPal", "Visa / Mastercard", "Мир"];

type CartItem = { id: number; name: string; price: number; qty: number; image: string };

const BADGE_STYLE: Record<string, string> = {
  "хит":       "badge-red",
  "хит продаж":"badge-red",
  "новинка":   "badge-green",
  "проверено": "badge-green",
  "эксклюзив": "badge-purple",
  "лимитед":   "badge-blue",
  "премиум":   "badge-yellow",
  "топ":       "badge-yellow",
};

function getBadgeClass(b: string) {
  return BADGE_STYLE[b.toLowerCase()] ?? "badge-blue";
}

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (p: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1, image: p.image }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const filteredProducts = PRODUCTS
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "downloads") return b.downloads - a.downloads;
      return 0;
    });

  const nav = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };
  const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Rubik', system-ui, sans-serif" }}>

      {/* ── TOPBAR ── */}
      <header style={{ background: "hsl(222 15% 9%)", borderBottom: "1px solid hsl(222 15% 16%)" }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 h-14">
          {/* Logo */}
          <button onClick={() => nav("home")} className="flex items-center gap-2 mr-3">
            <div className="w-8 h-8 rounded flex items-center justify-center font-black text-sm" style={{ background: "hsl(45,95%,55%)", color: "hsl(222 15% 8%)" }}>M</div>
            <span className="font-bold text-base hidden sm:block" style={{ color: "hsl(45,95%,62%)" }}>MAISON</span>
          </button>

          {/* Nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {[
              { key: "forum",   label: "Форумы",    icon: "MessageSquare" },
              { key: "catalog", label: "Каталог",   icon: "Package" },
              { key: "support", label: "Тикеты",    icon: "Ticket" },
              { key: "forum",   label: "Маркет",    icon: "Store" },
              { key: "blog",    label: "Реклама",   icon: "Megaphone" },
              { key: "about",   label: "О нас",     icon: "Info" },
            ].map((item, i) => (
              <button key={i} onClick={() => nav(item.key as Page)}
                className={`nav-link ${page === item.key && i < 2 ? "active" : ""}`}>
                <Icon name={item.icon} size={14} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => nav("cart")} className="nav-link relative">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden sm:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                  style={{ background: "hsl(45,95%,55%)", color: "hsl(222 15% 8%)" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="btn-yellow text-xs px-3 py-1.5">Войти</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden nav-link">
              <Icon name={menuOpen ? "X" : "Menu"} size={18} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1 animate-fade-in" style={{ borderColor: "hsl(222 15% 16%)", background: "hsl(222 15% 9%)" }}>
            {[
              { key: "home", label: "Главная" }, { key: "catalog", label: "Каталог" },
              { key: "about", label: "О нас" }, { key: "blog", label: "Блог" },
              { key: "forum", label: "Форум" }, { key: "support", label: "Поддержка" },
            ].map(item => (
              <button key={item.key} onClick={() => nav(item.key as Page)} className="nav-link justify-start">{item.label}</button>
            ))}
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* HOME */}
        {page === "home" && (
          <div>
            {/* Hero banner */}
            <div className="relative overflow-hidden rounded-xl mb-6 h-40 flex items-center px-8"
              style={{ background: "linear-gradient(135deg, hsl(222 15% 12%) 0%, hsl(222 20% 16%) 100%)", border: "1px solid hsl(222 15% 20%)" }}>
              <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
              <div className="relative z-10">
                <div className="text-xs font-semibold mb-1" style={{ color: "hsl(45,95%,62%)" }}>🔥 Добро пожаловать в MAISON</div>
                <h1 className="text-2xl font-bold mb-2">Эксклюзивные товары класса люкс</h1>
                <p className="text-sm" style={{ color: "hsl(215 10% 60%)" }}>Часы · Украшения · Красота · Парфюмерия — с гарантией подлинности</p>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex gap-3">
                <img src={WATCH_IMG} alt="" className="w-28 h-28 object-cover rounded-lg opacity-70" />
                <img src={SKIN_IMG} alt="" className="w-28 h-28 object-cover rounded-lg opacity-70" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { val: "12+", label: "Лет на рынке", icon: "Award" },
                { val: "4 800+", label: "Клиентов", icon: "Users" },
                { val: "320+", label: "Товаров", icon: "Package" },
                { val: "100%", label: "Гарантия", icon: "Shield" },
              ].map((s, i) => (
                <div key={i} className="row-card p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(45 95% 55% / 0.15)" }}>
                    <Icon name={s.icon} size={18} style={{ color: "hsl(45,95%,62%)" }} />
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: "hsl(45,95%,62%)" }}>{s.val}</div>
                    <div className="text-xs" style={{ color: "hsl(215 10% 55%)" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Layout: sidebar + content */}
            <div className="flex gap-5">
              <Sidebar activeCategory={activeCategory} setActiveCategory={(c) => { setActiveCategory(c); nav("catalog"); }} />

              <div className="flex-1 min-w-0">
                <div className="section-title">🛍 Уникальные товары</div>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-4 border-b" style={{ borderColor: "hsl(222 15% 20%)" }}>
                  {["Все товары", "Хиты", "Новинки", "Проверено"].map((tab, i) => (
                    <button key={i} className="px-4 py-2 text-xs font-semibold transition-colors border-b-2 -mb-px"
                      style={i === 0
                        ? { color: "hsl(45,95%,62%)", borderColor: "hsl(45,95%,55%)" }
                        : { color: "hsl(215 10% 55%)", borderColor: "transparent" }}>
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Product rows */}
                <div className="flex flex-col gap-2">
                  {PRODUCTS.slice(0, 6).map(p => (
                    <ProductRow key={p.id} product={p} onAdd={addToCart} fmt={fmt} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-2 mt-5">
                  {[1, 2, 3, "...", 167].map((pg, i) => (
                    <button key={i} className={`page-btn ${pg === 1 ? "active" : ""}`}>{pg}</button>
                  ))}
                  <button className="btn-ghost text-xs px-4">Вперёд →</button>
                </div>
              </div>
            </div>

            {/* Promo block */}
            <div className="mt-6 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6"
              style={{ background: "hsl(222 15% 13%)", border: "1px solid hsl(45 95% 55% / 0.2)" }}>
              <div className="flex-1">
                <div className="font-bold text-base mb-1" style={{ color: "hsl(45,95%,62%)" }}>Увеличьте продажи с MAISON!</div>
                <p className="text-sm mb-3" style={{ color: "hsl(215 10% 60%)" }}>
                  Размещайте ваши товары и услуги на нашей платформе. Тысячи покупателей уже ждут.
                </p>
                <button className="btn-yellow">Разместить товар</button>
              </div>
              <img src={WATCH_IMG} alt="" className="w-32 h-32 object-cover rounded-xl opacity-80 hidden md:block" />
            </div>

            {/* Reviews */}
            <div className="mt-5">
              <div className="section-title">💬 Последние отзывы</div>
              <div className="grid md:grid-cols-2 gap-3">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="row-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "hsl(45 95% 55% / 0.2)", color: "hsl(45,95%,62%)" }}>
                        {r.author[0]}
                      </div>
                      <span className="font-semibold text-sm">{r.author}</span>
                      <div className="flex gap-1">
                        {r.badges.map(b => <span key={b} className={`badge ${getBadgeClass(b)}`}>{b}</span>)}
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: "hsl(215 10% 65%)" }}>{r.text}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={11} style={{ color: s <= r.rating ? "hsl(45,95%,55%)" : "hsl(222 15% 28%)" }} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOG */}
        {page === "catalog" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(215 10% 45%)" }} />
                  <input className="ll-input pl-9" placeholder="Поиск товаров..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select className="ll-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Цена ↑</option>
                  <option value="price-desc">Цена ↓</option>
                  <option value="rating">По рейтингу</option>
                  <option value="downloads">Популярность</option>
                </select>
                <span className="text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "hsl(222 15% 18%)", color: "hsl(215 10% 55%)" }}>
                  {filteredProducts.length} товаров
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {filteredProducts.map(p => (
                  <ProductRow key={p.id} product={p} onAdd={addToCart} fmt={fmt} />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="py-16 text-center" style={{ color: "hsl(215 10% 45%)" }}>
                    <Icon name="PackageSearch" size={40} className="mx-auto mb-3 opacity-40" />
                    <div className="font-semibold">Ничего не найдено</div>
                  </div>
                )}
              </div>

              {filteredProducts.length > 0 && (
                <div className="flex items-center gap-2 mt-5">
                  {[1, 2, 3, "...", 167].map((pg, i) => (
                    <button key={i} className={`page-btn ${pg === 1 ? "active" : ""}`}>{pg}</button>
                  ))}
                  <button className="btn-ghost text-xs px-4">Вперёд →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="section-title">🏛 О компании MAISON</div>
              <div className="row-card p-6 mb-4">
                <div className="relative overflow-hidden rounded-lg mb-5 h-36"
                  style={{ backgroundImage: `url(${WATCH_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(222 15% 9% / 0.9), transparent)" }} />
                  <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <div className="font-bold text-xl mb-1">Традиции с 1912 года</div>
                    <div className="text-sm" style={{ color: "hsl(45,95%,62%)" }}>Более 100 лет безупречного качества</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(215 10% 65%)" }}>
                  В 1912 году Жан-Поль Мезон открыл небольшую мастерскую в Женеве. Сегодня MAISON — это онлайн-магазин эксклюзивных товаров для людей, которые ценят безупречное качество.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[["12+", "Лет"], ["4800+", "Клиентов"], ["100%", "Гарантия"]].map(([v, l], i) => (
                    <div key={i} className="text-center p-3 rounded-lg" style={{ background: "hsl(222 15% 17%)" }}>
                      <div className="font-bold text-lg" style={{ color: "hsl(45,95%,62%)" }}>{v}</div>
                      <div className="text-xs" style={{ color: "hsl(215 10% 55%)" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-title">📅 История бренда</div>
              <div className="flex flex-col gap-2">
                {[
                  ["1912", "Основание мастерской в Женеве"],
                  ["1945", "Первая коллекция ювелирных украшений"],
                  ["1978", "Выход на международный рынок"],
                  ["2002", "Запуск парфюмерной линии"],
                  ["2014", "Открытие интернет-магазина"],
                  ["2026", "Новая коллекция — 114 лет истории"],
                ].map(([year, title], i) => (
                  <div key={i} className="row-card p-4 flex items-center gap-4">
                    <span className="font-bold text-sm w-12 flex-shrink-0" style={{ color: "hsl(45,95%,62%)" }}>{year}</span>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "hsl(45,95%,55%)" }} />
                    <span className="text-sm">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BLOG */}
        {page === "blog" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="section-title">📰 Блог и советы</div>
              <div className="flex flex-col gap-3 mb-5">
                {BLOG_POSTS.map(post => (
                  <div key={post.id} className="row-card flex gap-4 p-4">
                    <img src={post.image} alt={post.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`badge badge-yellow`}>{post.category}</span>
                        <span className="text-xs" style={{ color: "hsl(215 10% 50%)" }}>{post.date}</span>
                      </div>
                      <div className="font-semibold text-sm mb-1 line-clamp-1">{post.title}</div>
                      <div className="text-xs line-clamp-2" style={{ color: "hsl(215 10% 58%)" }}>{post.excerpt}</div>
                    </div>
                    <button className="btn-ghost text-xs flex-shrink-0 self-center">Читать</button>
                  </div>
                ))}
              </div>

              <div className="section-title">📋 Новые статьи</div>
              {[
                { title: "Как хранить ювелирные украшения", date: "10 апр 2026", cat: "Украшения" },
                { title: "Топ-5 ароматов на лето 2026", date: "5 апр 2026", cat: "Парфюмерия" },
                { title: "Инвестиции в часы: что выбрать", date: "1 апр 2026", cat: "Часы" },
              ].map((p, i) => (
                <div key={i} className="row-card p-4 flex items-center justify-between mb-2 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <span className={`badge badge-green`}>{p.cat}</span>
                    <span className="text-sm font-medium group-hover:text-yellow-400 transition-colors">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: "hsl(215 10% 50%)" }}>{p.date}</span>
                    <Icon name="ChevronRight" size={14} style={{ color: "hsl(215 10% 45%)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORUM */}
        {page === "forum" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4">
                <div className="section-title mb-0">💬 Форум сообщества</div>
                <button className="btn-yellow text-xs">Создать тему</button>
              </div>

              <div className="flex flex-col gap-2 mb-6">
                {FORUM_TOPICS.map(topic => (
                  <div key={topic.id} className="row-card p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
                      style={{ background: "hsl(222 15% 20%)", color: "hsl(45,95%,62%)" }}>
                      {topic.author[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="badge badge-yellow">{topic.category}</span>
                        <span className="font-semibold text-sm">{topic.title}</span>
                      </div>
                      <div className="text-xs" style={{ color: "hsl(215 10% 50%)" }}>
                        {topic.author} · {topic.date}
                      </div>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                      <span className="counter counter-dl">
                        <Icon name="MessageCircle" size={12} />{topic.replies}
                      </span>
                      <span className="counter counter-star">
                        <Icon name="Eye" size={12} />{topic.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Market block */}
              <div className="rounded-xl p-5" style={{ background: "hsl(222 15% 13%)", border: "1px solid hsl(45 95% 55% / 0.2)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Store" size={20} style={{ color: "hsl(45,95%,62%)" }} />
                  <span className="font-bold text-base">Маркет участников</span>
                </div>
                <p className="text-sm mb-4" style={{ color: "hsl(215 10% 58%)" }}>Продавайте и покупайте товары у других участников сообщества</p>
                <button className="btn-ghost text-sm">Открыть маркет →</button>
              </div>
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {page === "support" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="section-title">🎫 Поддержка и тикеты</div>

              <div className="grid md:grid-cols-3 gap-3 mb-5">
                {[
                  { icon: "MessageCircle", title: "Онлайн-чат", desc: "Ответим за 5 минут", action: "Открыть" },
                  { icon: "Phone", title: "+7 (800) 000-00-00", desc: "Бесплатно по России", action: "Позвонить" },
                  { icon: "Mail", title: "support@maison.ru", desc: "Ответим в течение часа", action: "Написать" },
                ].map((c, i) => (
                  <div key={i} className="row-card p-4 text-center">
                    <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: "hsl(45 95% 55% / 0.15)" }}>
                      <Icon name={c.icon} size={18} style={{ color: "hsl(45,95%,62%)" }} />
                    </div>
                    <div className="font-semibold text-sm mb-1">{c.title}</div>
                    <div className="text-xs mb-3" style={{ color: "hsl(215 10% 55%)" }}>{c.desc}</div>
                    <button className="btn-ghost text-xs w-full">{c.action}</button>
                  </div>
                ))}
              </div>

              <div className="section-title">❓ Частые вопросы</div>
              <div className="flex flex-col gap-2 mb-5">
                {[
                  { q: "Как оформить заказ?", a: "Добавьте товар в корзину и следуйте инструкциям. Принимаем Яндекс.Кассу, PayPal и карты." },
                  { q: "Как долго идёт доставка?", a: "По Москве — 1-2 дня. По России — 3-7 рабочих дней." },
                  { q: "Как вернуть товар?", a: "Возврат в течение 14 дней. Товар должен быть в оригинальной упаковке." },
                  { q: "Гарантия подлинности?", a: "Все товары поставляются с сертификатом. Работаем только с официальными поставщиками." },
                ].map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
              </div>

              <div className="section-title">📩 Создать тикет</div>
              <div className="row-card p-5 space-y-3">
                <input className="ll-input" type="text" placeholder="Тема обращения" />
                <textarea className="ll-input resize-none" rows={4} placeholder="Опишите проблему подробно..." />
                <button className="btn-yellow">Отправить тикет</button>
              </div>
            </div>
          </div>
        )}

        {/* CART */}
        {page === "cart" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="section-title">🛒 Корзина</div>
              {cart.length === 0 ? (
                <div className="row-card py-16 text-center">
                  <Icon name="ShoppingCart" size={40} className="mx-auto mb-3 opacity-30" />
                  <div className="font-semibold mb-1">Корзина пуста</div>
                  <div className="text-sm mb-4" style={{ color: "hsl(215 10% 50%)" }}>Добавьте товары из каталога</div>
                  <button onClick={() => nav("catalog")} className="btn-yellow">Перейти в каталог</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 flex flex-col gap-2">
                    {cart.map(item => (
                      <div key={item.id} className="row-card p-4 flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm mb-1">{item.name}</div>
                          <div className="font-bold text-sm" style={{ color: "hsl(45,95%,62%)" }}>{fmt(item.price)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="btn-ghost px-2 py-1 text-sm">−</button>
                          <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="btn-ghost px-2 py-1 text-sm">+</button>
                          <button onClick={() => removeFromCart(item.id)} className="btn-ghost px-2 py-1">
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row-card p-5 h-fit">
                    <div className="font-bold text-base mb-4">Итого</div>
                    <div className="space-y-2 mb-4 text-sm" style={{ color: "hsl(215 10% 58%)" }}>
                      <div className="flex justify-between"><span>Товаров:</span><span>{cartCount} шт.</span></div>
                      <div className="flex justify-between"><span>Доставка:</span><span className="text-green-400">Бесплатно</span></div>
                    </div>
                    <div className="flex justify-between items-center mb-4 pt-3" style={{ borderTop: "1px solid hsl(222 15% 20%)" }}>
                      <span className="font-semibold">Сумма:</span>
                      <span className="font-bold text-lg" style={{ color: "hsl(45,95%,62%)" }}>{fmt(cartTotal)}</span>
                    </div>

                    <div className="mb-4 text-xs font-semibold" style={{ color: "hsl(215 10% 55%)" }}>Способ оплаты:</div>
                    {PAYMENT_METHODS.map(pm => (
                      <label key={pm} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <div className="w-4 h-4 rounded border flex-shrink-0" style={{ border: "1px solid hsl(222 15% 30%)" }} />
                        <span className="text-sm">{pm}</span>
                      </label>
                    ))}

                    <button onClick={() => nav("checkout")} className="btn-yellow w-full mt-4 text-center text-sm">
                      Оформить заказ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHECKOUT */}
        {page === "checkout" && (
          <div className="flex gap-5">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <div className="flex-1 min-w-0">
              <div className="section-title">✅ Оформление заказа</div>
              <div className="flex flex-col gap-4">
                <div className="row-card p-5">
                  <div className="font-semibold mb-4">Контактные данные</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {["Имя", "Фамилия", "Email", "Телефон"].map(f => (
                      <input key={f} className="ll-input" type="text" placeholder={f} />
                    ))}
                  </div>
                </div>
                <div className="row-card p-5">
                  <div className="font-semibold mb-4">Адрес доставки</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {["Город", "Улица и дом", "Квартира", "Индекс"].map(f => (
                      <input key={f} className="ll-input" type="text" placeholder={f} />
                    ))}
                  </div>
                </div>
                <div className="row-card p-5">
                  <div className="font-semibold mb-4">Оплата</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {PAYMENT_METHODS.map((pm, i) => (
                      <button key={pm} className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors ${i === 0 ? "border-yellow-400 text-yellow-400" : "btn-ghost"}`}>
                        {pm}
                      </button>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <input className="ll-input" type="text" placeholder="Номер карты" />
                    <div className="grid grid-cols-2 gap-3">
                      <input className="ll-input" type="text" placeholder="MM/YY" />
                      <input className="ll-input" type="text" placeholder="CVV" />
                    </div>
                  </div>
                </div>

                <div className="row-card p-5" style={{ border: "1px solid hsl(45 95% 55% / 0.3)", background: "hsl(45 95% 55% / 0.05)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold">К оплате:</span>
                    <span className="font-bold text-xl" style={{ color: "hsl(45,95%,62%)" }}>{fmt(cartTotal)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(215 10% 55%)" }}>
                    <Icon name="Shield" size={12} style={{ color: "hsl(45,95%,55%)" }} />
                    Платёж защищён SSL-шифрованием
                  </div>
                  <button className="btn-yellow w-full">Подтвердить и оплатить {fmt(cartTotal)}</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer className="mt-8 border-t" style={{ borderColor: "hsl(222 15% 16%)", background: "hsl(222 15% 9%)" }}>
        {/* Contact block */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="rounded-xl p-6 mb-8 text-center" style={{ background: "hsl(222 15% 13%)", border: "1px solid hsl(222 15% 20%)" }}>
            <div className="font-bold mb-2" style={{ color: "hsl(45,95%,62%)" }}>ВОПРОСЫ / ЖАЛОБЫ / ПРЕДЛОЖЕНИЯ</div>
            <p className="text-sm mb-3" style={{ color: "hsl(215 10% 60%)" }}>
              1. Email: <span style={{ color: "hsl(45,95%,62%)" }}>support@maison.ru</span><br />
              2. Или создайте тикет в разделе поддержки
            </p>
            <button onClick={() => nav("support")} className="btn-yellow text-sm">Написать нам</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="font-bold text-base mb-3" style={{ color: "hsl(45,95%,62%)" }}>MAISON</div>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(215 10% 50%)" }}>Эксклюзивные товары класса люкс с гарантией подлинности с 1912 года.</p>
            </div>
            {[
              { title: "Магазин", links: ["Каталог", "Новинки", "Акции", "Хиты"] },
              { title: "Компания", links: ["О нас", "Блог", "Форум", "Реклама"] },
              { title: "Помощь", links: ["Поддержка", "Доставка", "Возврат", "FAQ"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: "hsl(215 10% 55%)" }}>{col.title}</div>
                <div className="space-y-2">
                  {col.links.map(l => (
                    <button key={l} className="block text-sm transition-colors" style={{ color: "hsl(215 10% 55%)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "hsl(45,95%,62%)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "hsl(215 10% 55%)")}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 border-t text-xs" style={{ borderColor: "hsl(222 15% 18%)", color: "hsl(215 10% 40%)" }}>
            <span>© MAISON 2012–2026. Любое копирование материалов запрещено.</span>
            <div className="flex gap-4">
              {["Обратная связь", "Условия", "Конфиденциальность", "Помощь"].map(l => (
                <button key={l} className="hover:text-foreground transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sidebar ── */
function Sidebar({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (c: string) => void }) {
  return (
    <aside className="w-56 flex-shrink-0 hidden md:flex flex-col gap-4">
      {/* Categories */}
      <div className="rounded-xl p-3" style={{ background: "hsl(222 15% 13%)", border: "1px solid hsl(222 15% 20%)" }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: "hsl(45,95%,62%)" }}>Категории</div>
        {SIDEBAR_CATS.map(cat => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
            className={`sidebar-item w-full text-left ${activeCategory === cat.key ? "active" : ""}`}>
            <div className="flex items-center gap-2">
              <Icon name={cat.icon} size={14} />
              <span>{cat.label}</span>
            </div>
            <span className="tag-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Cheatsheet */}
      <div className="rounded-xl p-3" style={{ background: "hsl(222 15% 13%)", border: "1px solid hsl(222 15% 20%)" }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: "hsl(215 10% 55%)" }}>Полезное</div>
        {SIDEBAR_TOOLS.map((t, i) => (
          <button key={i} className="sidebar-item w-full text-left text-xs" style={{ color: "hsl(215 10% 62%)" }}>
            <span>{t}</span>
            <Icon name="ChevronRight" size={12} />
          </button>
        ))}
        <button className="sidebar-item w-full text-left text-xs" style={{ color: "hsl(45,95%,55%)" }}>
          Смотреть больше
        </button>
      </div>

      {/* Recent reviews */}
      <div className="rounded-xl p-3" style={{ background: "hsl(222 15% 13%)", border: "1px solid hsl(222 15% 20%)" }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 px-1" style={{ color: "hsl(215 10% 55%)" }}>Последние отзывы</div>
        {[
          { name: "Анна М.", badge: "хит", text: "Часы пришли идеально!" },
          { name: "Сергей К.", badge: "эксклюзив", text: "Парфюм — восторг." },
        ].map((r, i) => (
          <div key={i} className="mb-3 pb-3" style={{ borderBottom: i < 1 ? "1px solid hsl(222 15% 20%)" : "none" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "hsl(45 95% 55% / 0.2)", color: "hsl(45,95%,62%)" }}>{r.name[0]}</div>
              <span className="text-xs font-semibold">{r.name}</span>
            </div>
            <span className={`badge ${getBadgeClass(r.badge)} mb-1`}>{r.badge}</span>
            <p className="text-xs mt-1" style={{ color: "hsl(215 10% 58%)" }}>{r.text}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ── ProductRow ── */
function ProductRow({ product, onAdd, fmt }: {
  product: typeof PRODUCTS[0];
  onAdd: (p: typeof PRODUCTS[0]) => void;
  fmt: (n: number) => string;
}) {
  return (
    <div className="row-card p-4 flex items-center gap-4">
      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {product.badges.map(b => (
            <span key={b} className={`badge ${getBadgeClass(b)}`}>{b}</span>
          ))}
          <span className="font-semibold text-sm">{product.name}</span>
          <span className="text-xs" style={{ color: "hsl(215 10% 50%)" }}>{product.version}</span>
        </div>
        <div className="text-xs mb-1 line-clamp-1" style={{ color: "hsl(215 10% 58%)" }}>
          {product.seller} · {product.date} · <span style={{ color: "hsl(45,95%,55%)" }}>{fmt(product.price)}</span>
        </div>
        <div className="text-xs line-clamp-1" style={{ color: "hsl(215 10% 52%)" }}>{product.desc}</div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="counter counter-dl">
          <Icon name="Download" size={12} />{product.downloads}
        </span>
        <span className="counter counter-star">
          <Icon name="Star" size={12} />{product.rating}
        </span>
        <button onClick={() => onAdd(product)} className="btn-yellow text-xs px-3 py-1.5">
          Купить
        </button>
      </div>
    </div>
  );
}

/* ── FaqItem ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="row-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="font-semibold text-sm">{q}</span>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: "hsl(215 10% 50%)", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm animate-fade-in" style={{ color: "hsl(215 10% 62%)" }}>{a}</div>
      )}
    </div>
  );
}

function getBadgeClass(b: string) {
  const map: Record<string, string> = {
    "хит": "badge-red", "хит продаж": "badge-red",
    "новинка": "badge-green", "проверено": "badge-green",
    "эксклюзив": "badge-purple", "лимитед": "badge-blue",
    "премиум": "badge-yellow", "топ": "badge-yellow",
  };
  return map[b.toLowerCase()] ?? "badge-blue";
}