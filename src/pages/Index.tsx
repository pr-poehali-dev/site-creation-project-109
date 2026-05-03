import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/f1adcff1-6734-4ea4-8383-ce7874b09d52/files/b99d2fa2-c896-41b7-9dba-0c2a622fc618.jpg";
const WATCH_IMG = "https://cdn.poehali.dev/projects/f1adcff1-6734-4ea4-8383-ce7874b09d52/files/5c481c39-33c9-4e5e-b6ca-367dd4d38e3e.jpg";
const SKIN_IMG = "https://cdn.poehali.dev/projects/f1adcff1-6734-4ea4-8383-ce7874b09d52/files/2f875bf5-d93a-4661-98e5-906ef9a16d7f.jpg";

type Page = "home" | "catalog" | "about" | "blog" | "forum" | "support" | "cart" | "checkout";

const PRODUCTS = [
  { id: 1, name: "Хронограф Noir", price: 285000, category: "watches", image: WATCH_IMG, tag: "Эксклюзив", rating: 4.9 },
  { id: 2, name: "Serum d'Or", price: 18500, category: "beauty", image: SKIN_IMG, tag: "Хит продаж", rating: 4.8 },
  { id: 3, name: "Velvet Essence", price: 24900, category: "perfume", image: HERO_IMG, tag: "Новинка", rating: 5.0 },
  { id: 4, name: "Сапфировый браслет", price: 142000, category: "jewelry", image: WATCH_IMG, tag: "Лимитед", rating: 4.7 },
  { id: 5, name: "Royal Elixir", price: 31200, category: "beauty", image: SKIN_IMG, tag: "Топ", rating: 4.9 },
  { id: 6, name: "Grand Tourbillon", price: 520000, category: "watches", image: WATCH_IMG, tag: "Премиум", rating: 5.0 },
  { id: 7, name: "Ambre Mystique", price: 19800, category: "perfume", image: HERO_IMG, tag: "Хит", rating: 4.6 },
  { id: 8, name: "Золотая нить", price: 87000, category: "jewelry", image: SKIN_IMG, tag: "Эксклюзив", rating: 4.8 },
];

const CATEGORIES = [
  { key: "all", label: "Все" },
  { key: "watches", label: "Часы" },
  { key: "jewelry", label: "Украшения" },
  { key: "beauty", label: "Красота" },
  { key: "perfume", label: "Парфюмерия" },
];

const BLOG_POSTS = [
  { id: 1, title: "Искусство швейцарского часового дела", date: "28 апр 2026", category: "Часы", image: WATCH_IMG, excerpt: "Погружение в мир точности и мастерства, где каждая деталь — произведение искусства." },
  { id: 2, title: "Ритуал ухода за кожей класса люкс", date: "22 апр 2026", category: "Красота", image: SKIN_IMG, excerpt: "Как выстроить утренний ритуал с продуктами, достойными королевского двора." },
  { id: 3, title: "История великих парфюмерных домов", date: "15 апр 2026", category: "Парфюмерия", image: HERO_IMG, excerpt: "От Chanel до современных нишевых брендов — путь аромата сквозь столетия." },
];

const FORUM_TOPICS = [
  { id: 1, title: "Как отличить оригинал от реплики?", replies: 34, views: 1240, category: "Советы" },
  { id: 2, title: "Лучшие ароматы для деловых встреч", replies: 19, views: 876, category: "Парфюмерия" },
  { id: 3, title: "Уход за швейцарскими часами", replies: 45, views: 2100, category: "Часы" },
  { id: 4, title: "Какие украшения актуальны в 2026?", replies: 28, views: 1530, category: "Украшения" },
];

const PAYMENT_METHODS = ["Яндекс.Касса", "PayPal", "Visa / Mastercard", "Мир"];

type CartItem = { id: number; name: string; price: number; qty: number; image: string };

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState<number[]>([]);

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
  const toggleWishlist = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const filteredProducts = PRODUCTS
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const nav = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };
  const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen bg-background text-foreground scrollbar-luxury">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => nav("home")} className="font-display text-2xl tracking-[0.25em] gold-gradient font-light">
            MAISON
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { key: "home", label: "Главная" },
              { key: "catalog", label: "Каталог" },
              { key: "about", label: "О компании" },
              { key: "blog", label: "Блог" },
              { key: "forum", label: "Форум" },
              { key: "support", label: "Поддержка" },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => nav(item.key as Page)}
                className={`text-xs tracking-[0.15em] uppercase font-body transition-colors ${
                  page === item.key ? "gold-text" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => nav("cart")} className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-background text-[9px] flex items-center justify-center font-body font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-muted-foreground">
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {[
              { key: "home", label: "Главная" },
              { key: "catalog", label: "Каталог" },
              { key: "about", label: "О компании" },
              { key: "blog", label: "Блог" },
              { key: "forum", label: "Форум" },
              { key: "support", label: "Поддержка" },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => nav(item.key as Page)}
                className="text-left text-xs tracking-[0.15em] uppercase font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HOME */}
        {page === "home" && (
          <div>
            <section className="relative h-[92vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})`, filter: "brightness(0.35)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
              <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl">
                  <p className="section-label mb-6 animate-slide-up animate-stagger-1">Коллекция 2026</p>
                  <h1 className="font-display text-6xl md:text-8xl font-light leading-none mb-6 animate-slide-up animate-stagger-2">
                    Роскошь,<br />
                    <em className="gold-gradient not-italic">рождённая</em><br />
                    из деталей
                  </h1>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-10 max-w-md animate-slide-up animate-stagger-3">
                    Эксклюзивные товары высочайшего качества. Каждый предмет создан мастерами с многолетней историей.
                  </p>
                  <div className="flex items-center gap-4 animate-slide-up animate-stagger-4">
                    <button onClick={() => nav("catalog")} className="luxury-btn">Смотреть коллекцию</button>
                    <button onClick={() => nav("about")} className="luxury-btn-outline">О нас</button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="section-label text-muted-foreground">Прокрутите</span>
                <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold opacity-60" />
              </div>
            </section>

            <section className="border-y border-border">
              <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { num: "12+", label: "Лет на рынке" },
                  { num: "4 800+", label: "Довольных клиентов" },
                  { num: "320+", label: "Товаров" },
                  { num: "100%", label: "Гарантия подлинности" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-display text-3xl md:text-4xl gold-gradient mb-1">{s.num}</div>
                    <div className="section-label text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex flex-col items-center text-center mb-14">
                <p className="section-label mb-3">Коллекции</p>
                <h2 className="font-display text-5xl font-light">Наши категории</h2>
                <div className="divider-gold mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Часы", sub: "Швейцарская точность", img: WATCH_IMG, cat: "watches" },
                  { label: "Украшения", sub: "Благородные металлы", img: HERO_IMG, cat: "jewelry" },
                  { label: "Красота & Парфюм", sub: "Редкие ингредиенты", img: SKIN_IMG, cat: "beauty" },
                ].map((cat, i) => (
                  <button key={i} onClick={() => { setActiveCategory(cat.cat); nav("catalog"); }} className="group relative overflow-hidden aspect-[3/4] text-left">
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="section-label mb-1">{cat.sub}</p>
                      <h3 className="font-display text-3xl font-light">{cat.label}</h3>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 border border-gold/40 group-hover:border-gold transition-colors flex items-center justify-center">
                      <Icon name="ArrowRight" size={14} className="text-gold" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-20">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="section-label mb-2">Избранное</p>
                  <h2 className="font-display text-5xl font-light">Лучшие товары</h2>
                </div>
                <button onClick={() => nav("catalog")} className="luxury-btn-outline hidden md:block">Весь каталог</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCTS.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} onWish={toggleWishlist} wishlisted={wishlist.includes(p.id)} formatPrice={formatPrice} />
                ))}
              </div>
            </section>

            <section className="border-t border-border">
              <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <p className="section-label mb-4">Наша история</p>
                  <h2 className="font-display text-5xl font-light leading-tight mb-6">
                    Традиции роскоши<br />с <em className="gold-gradient not-italic">1912 года</em>
                  </h2>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                    На протяжении более ста лет Maison остаётся синонимом безупречного качества. Мы работаем только с теми мастерами, чьи имена стали легендами.
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
                    Каждый товар в нашем каталоге проходит строгую экспертизу подлинности и поставляется с сертификатом.
                  </p>
                  <button onClick={() => nav("about")} className="luxury-btn-outline">Читать историю</button>
                </div>
                <div className="relative">
                  <img src={HERO_IMG} alt="История бренда" className="w-full aspect-square object-cover" />
                  <div className="absolute -bottom-4 -left-4 border border-gold/30 w-full h-full pointer-events-none" />
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="section-label mb-2">Знания</p>
                  <h2 className="font-display text-5xl font-light">Блог и советы</h2>
                </div>
                <button onClick={() => nav("blog")} className="luxury-btn-outline hidden md:block">Все статьи</button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {BLOG_POSTS.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            <section className="border-t border-border">
              <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="section-label">Способы оплаты</p>
                <div className="flex flex-wrap gap-3">
                  {PAYMENT_METHODS.map(pm => (
                    <span key={pm} className="border border-border px-4 py-2 text-xs font-body text-muted-foreground tracking-widest">{pm}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Shield" size={14} className="text-gold" />
                  <span className="text-xs font-body">Защищённые платежи</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CATALOG */}
        {page === "catalog" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="section-label mb-2">Все товары</p>
              <h1 className="font-display text-5xl font-light">Каталог</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Icon name="Search" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-muted border border-border pl-10 pr-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-muted border border-border px-4 py-3 text-sm font-body text-muted-foreground focus:outline-none focus:border-gold transition-colors"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена ↑</option>
                <option value="price-desc">Цена ↓</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(c => (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`px-5 py-2 text-xs tracking-[0.15em] uppercase font-body transition-all ${
                    activeCategory === c.key ? "bg-gold text-background" : "border border-border text-muted-foreground hover:border-gold hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} onWish={toggleWishlist} wishlisted={wishlist.includes(p.id)} formatPrice={formatPrice} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-4 py-20 text-center">
                  <Icon name="Search" size={32} className="mx-auto text-muted-foreground mb-4" />
                  <p className="font-display text-2xl font-light text-muted-foreground">Товары не найдены</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {page === "about" && (
          <div>
            <section className="relative h-[50vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${WATCH_IMG})`, filter: "brightness(0.25)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
              <div className="relative z-10 max-w-7xl mx-auto px-6">
                <p className="section-label mb-4">Наша история</p>
                <h1 className="font-display text-6xl md:text-7xl font-light">О компании</h1>
              </div>
            </section>
            <section className="max-w-4xl mx-auto px-6 py-20">
              <div className="grid md:grid-cols-2 gap-16 mb-20">
                <div>
                  <h2 className="font-display text-4xl font-light mb-6">Начало пути</h2>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                    В 1912 году Жан-Поль Мезон открыл небольшую мастерскую в Женеве, где создавал уникальные украшения для аристократии Европы. Его девиз — «качество без компромиссов» — стал фундаментом всего, что мы делаем сегодня.
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    Сегодня Maison — это интернет-магазин эксклюзивных товаров для людей, которые ценят безупречное качество, историю и уникальность каждой вещи.
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-4xl font-light mb-6">Наши ценности</h2>
                  <div className="space-y-4">
                    {[
                      { icon: "Award", title: "Подлинность", desc: "Каждый товар сопровождается сертификатом подлинности" },
                      { icon: "Shield", title: "Доверие", desc: "12 лет на рынке, тысячи довольных клиентов" },
                      { icon: "Star", title: "Превосходство", desc: "Только мастера с мировым признанием" },
                    ].map((v, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name={v.icon} size={14} className="text-gold" />
                        </div>
                        <div>
                          <div className="font-body text-sm font-medium mb-1">{v.title}</div>
                          <div className="font-body text-xs text-muted-foreground">{v.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-display text-4xl font-light mb-10 text-center">История бренда</h2>
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                  {[
                    { year: "1912", title: "Основание мастерской в Женеве" },
                    { year: "1945", title: "Первая коллекция ювелирных украшений" },
                    { year: "1978", title: "Выход на международный рынок" },
                    { year: "2002", title: "Запуск парфюмерной линии" },
                    { year: "2014", title: "Открытие интернет-магазина" },
                    { year: "2026", title: "Новая коллекция — 114 лет истории" },
                  ].map((t, i) => (
                    <div key={i} className={`relative flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} mb-8`}>
                      <div className={`w-1/2 ${i % 2 === 0 ? "pr-10 text-right" : "pl-10"}`}>
                        <div className="font-display text-2xl gold-text mb-1">{t.year}</div>
                        <div className="font-body text-sm text-muted-foreground">{t.title}</div>
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 border border-gold bg-background" style={{ top: 4 }} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* BLOG */}
        {page === "blog" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
              <p className="section-label mb-2">Статьи и советы</p>
              <h1 className="font-display text-5xl font-light">Блог</h1>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {BLOG_POSTS.map(post => (
                <BlogCard key={post.id} post={post} full />
              ))}
            </div>
            <div className="border-t border-border pt-8 space-y-0">
              {[
                { title: "Как хранить ювелирные украшения", date: "10 апр 2026", cat: "Украшения" },
                { title: "Топ-5 ароматов на лето 2026", date: "5 апр 2026", cat: "Парфюмерия" },
                { title: "Инвестиции в часы: что выбрать", date: "1 апр 2026", cat: "Часы" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-5 border-b border-border hover:bg-muted/30 px-4 -mx-4 transition-colors cursor-pointer group">
                  <div>
                    <span className="section-label text-gold mr-3">{p.cat}</span>
                    <span className="font-display text-xl font-light group-hover:text-gold transition-colors">{p.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-xs text-muted-foreground">{p.date}</span>
                    <Icon name="ArrowRight" size={14} className="text-gold" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORUM */}
        {page === "forum" && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="section-label mb-2">Сообщество</p>
                <h1 className="font-display text-5xl font-light">Форум</h1>
              </div>
              <button className="luxury-btn">Создать тему</button>
            </div>
            <div className="space-y-3">
              {FORUM_TOPICS.map(topic => (
                <div key={topic.id} className="border border-border hover:border-gold/50 transition-all p-6 cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="product-tag text-gold border border-gold/30 px-2 py-0.5">{topic.category}</span>
                      <h3 className="font-display text-xl font-light mt-2 group-hover:text-gold transition-colors">{topic.title}</h3>
                    </div>
                    <div className="flex gap-6 text-muted-foreground flex-shrink-0">
                      <div className="text-center">
                        <div className="font-display text-lg gold-text">{topic.replies}</div>
                        <div className="section-label text-muted-foreground">ответов</div>
                      </div>
                      <div className="text-center">
                        <div className="font-display text-lg gold-text">{topic.views}</div>
                        <div className="section-label text-muted-foreground">просмотров</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 border border-gold/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Store" size={18} className="text-gold" />
                <h2 className="font-display text-3xl font-light">Маркет участников</h2>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-6">Продавайте и покупайте товары у других участников сообщества</p>
              <button className="luxury-btn-outline">Открыть маркет</button>
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {page === "support" && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-12">
              <p className="section-label mb-2">Помощь и ответы</p>
              <h1 className="font-display text-5xl font-light">Поддержка</h1>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {[
                { icon: "MessageCircle", title: "Чат", desc: "Онлайн-чат с поддержкой", action: "Открыть чат" },
                { icon: "Phone", title: "Телефон", desc: "+7 (800) 000-00-00", action: "Позвонить" },
                { icon: "Mail", title: "Email", desc: "support@maison.ru", action: "Написать" },
              ].map((c, i) => (
                <div key={i} className="luxury-card p-6 text-center">
                  <div className="w-12 h-12 border border-gold/30 mx-auto mb-4 flex items-center justify-center">
                    <Icon name={c.icon} size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-light mb-2">{c.title}</h3>
                  <p className="font-body text-xs text-muted-foreground mb-4">{c.desc}</p>
                  <button className="luxury-btn-outline w-full">{c.action}</button>
                </div>
              ))}
            </div>
            <h2 className="font-display text-3xl font-light mb-6">Частые вопросы</h2>
            <div className="space-y-0">
              {[
                { q: "Как оформить заказ?", a: "Добавьте товар в корзину и следуйте инструкциям при оформлении заказа. Принимаем карты, PayPal и Яндекс.Кассу." },
                { q: "Как долго идёт доставка?", a: "По Москве — 1-2 дня. По России — 3-7 рабочих дней. Экспресс-доставка доступна в большинстве городов." },
                { q: "Как вернуть товар?", a: "Возврат в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке без следов использования." },
                { q: "Гарантия подлинности?", a: "Все товары поставляются с сертификатом подлинности. Мы работаем только с официальными поставщиками." },
              ].map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="mt-12 border border-border p-8">
              <h2 className="font-display text-3xl font-light mb-6">Создать тикет</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Тема обращения" className="w-full bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                <textarea placeholder="Опишите проблему подробно..." rows={4} className="w-full bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors resize-none" />
                <button className="luxury-btn">Отправить тикет</button>
              </div>
            </div>
          </div>
        )}

        {/* CART */}
        {page === "cart" && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="section-label mb-2">Ваши товары</p>
              <h1 className="font-display text-5xl font-light">Корзина</h1>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-6" />
                <h2 className="font-display text-3xl font-light text-muted-foreground mb-4">Корзина пуста</h2>
                <p className="font-body text-sm text-muted-foreground mb-8">Добавьте товары из каталога</p>
                <button onClick={() => nav("catalog")} className="luxury-btn">Перейти в каталог</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border border-border p-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-light mb-1">{item.name}</h3>
                        <p className="gold-text font-body text-sm font-medium">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                          <Icon name="X" size={16} />
                        </button>
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1 text-muted-foreground hover:text-foreground transition-colors">
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="px-3 py-1 font-body text-sm border-x border-border">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1 text-muted-foreground hover:text-foreground transition-colors">
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border border-border p-6 h-fit">
                  <h2 className="font-display text-2xl font-light mb-6">Итого</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between font-body text-sm text-muted-foreground">
                      <span>Товаров</span><span>{cartCount} шт.</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-muted-foreground">
                      <span>Доставка</span><span>Бесплатно</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-display text-xl font-light">Сумма</span>
                      <span className="font-display text-xl gold-text">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <p className="section-label mb-2">Способ оплаты</p>
                    {PAYMENT_METHODS.map(pm => (
                      <label key={pm} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-border group-hover:border-gold transition-colors flex items-center justify-center">
                          <div className="w-2 h-2 bg-gold opacity-0 group-hover:opacity-60" />
                        </div>
                        <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">{pm}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => nav("checkout")} className="luxury-btn w-full text-center">
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT */}
        {page === "checkout" && (
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="mb-10">
              <p className="section-label mb-2">Последний шаг</p>
              <h1 className="font-display text-5xl font-light">Оформление</h1>
            </div>
            <div className="space-y-8">
              <div className="border border-border p-6">
                <h2 className="font-display text-2xl font-light mb-5">Контактные данные</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Имя", "Фамилия", "Email", "Телефон"].map(f => (
                    <input key={f} type="text" placeholder={f} className="bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                  ))}
                </div>
              </div>
              <div className="border border-border p-6">
                <h2 className="font-display text-2xl font-light mb-5">Адрес доставки</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {["Город", "Улица и дом", "Квартира", "Индекс"].map(f => (
                    <input key={f} type="text" placeholder={f} className="bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                  ))}
                </div>
              </div>
              <div className="border border-border p-6">
                <h2 className="font-display text-2xl font-light mb-5">Оплата</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {PAYMENT_METHODS.map((pm, i) => (
                    <button key={pm} className={`border py-3 text-xs font-body tracking-wider transition-colors ${i === 0 ? "border-gold text-gold" : "border-border text-muted-foreground hover:border-gold"}`}>
                      {pm}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Номер карты" className="bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                    <input type="text" placeholder="CVV" className="bg-muted border border-border px-4 py-3 text-sm font-body focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
              </div>
              <div className="border border-gold/30 p-6 bg-gold/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-display text-2xl font-light">К оплате</span>
                  <span className="font-display text-3xl gold-text">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <Icon name="Shield" size={14} className="text-gold" />
                  <span className="font-body text-xs">Платёж защищён SSL-шифрованием</span>
                </div>
                <button className="luxury-btn w-full text-center text-sm">
                  Подтвердить и оплатить {formatPrice(cartTotal)}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="font-display text-2xl tracking-[0.25em] gold-gradient font-light mb-4">MAISON</div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Эксклюзивные товары класса люкс с гарантией подлинности с 1912 года.
              </p>
            </div>
            {[
              { title: "Магазин", links: ["Каталог", "Новинки", "Акции"] },
              { title: "Компания", links: ["О нас", "Блог", "Форум"] },
              { title: "Помощь", links: ["Поддержка", "Доставка", "Возврат"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="section-label mb-4">{col.title}</div>
                <div className="space-y-2">
                  {col.links.map(l => (
                    <button key={l} className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-muted-foreground">© 2026 Maison. Все права защищены.</p>
            <div className="flex gap-4">
              {["Instagram", "Telegram", "VK"].map(s => (
                <button key={s} className="font-body text-xs text-muted-foreground hover:text-gold transition-colors tracking-wider">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onAdd, onWish, wishlisted, formatPrice }: {
  product: typeof PRODUCTS[0];
  onAdd: (p: typeof PRODUCTS[0]) => void;
  onWish: (id: number) => void;
  wishlisted: boolean;
  formatPrice: (n: number) => string;
}) {
  return (
    <div className="luxury-card group">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3">
          <span className="product-tag bg-background/80 border border-gold/30 text-gold px-2 py-1">{product.tag}</span>
        </div>
        <button
          onClick={() => onWish(product.id)}
          className={`absolute top-3 right-3 w-8 h-8 border flex items-center justify-center transition-all ${
            wishlisted ? "border-gold bg-gold text-background" : "border-border bg-background/60 text-muted-foreground hover:border-gold hover:text-gold"
          }`}
        >
          <Icon name="Heart" size={12} />
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <button onClick={() => onAdd(product)} className="luxury-btn w-full text-center text-xs py-2.5">
            В корзину
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="Star" size={10} className={i < Math.floor(product.rating) ? "text-gold" : "text-muted"} />
          ))}
          <span className="font-body text-xs text-muted-foreground ml-1">{product.rating}</span>
        </div>
        <h3 className="font-display text-lg font-light leading-tight mb-2">{product.name}</h3>
        <p className="gold-text font-body text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

function BlogCard({ post, full }: { post: typeof BLOG_POSTS[0]; full?: boolean }) {
  return (
    <div className="luxury-card group cursor-pointer overflow-hidden">
      <div className="overflow-hidden aspect-video">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="product-tag text-gold border border-gold/30 px-2 py-0.5">{post.category}</span>
          <span className="font-body text-xs text-muted-foreground">{post.date}</span>
        </div>
        <h3 className="font-display text-xl font-light mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
        {full && <p className="font-body text-xs text-muted-foreground leading-relaxed">{post.excerpt}</p>}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-display text-xl font-light">{q}</span>
        <Icon name={open ? "Minus" : "Plus"} size={16} className="text-gold flex-shrink-0" />
      </button>
      {open && (
        <div className="pb-5 font-body text-sm text-muted-foreground leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}