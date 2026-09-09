import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
const categories = [
  { icon: "★", title: "تصميمات مميزة", type: "icon" },
  { icon: "🧦", title: "شرابات قصيرة", type: "emoji" },
  { icon: "👟", title: "شرابات طويلة", type: "emoji" },
  { icon: "🏃", title: "شرابات رياضية", type: "emoji" },
  { icon: "♡", title: "شرابات بناتي", type: "icon" },
  { icon: "🎀", title: "شرابات أطفال", type: "emoji" },
  { icon: "10+", title: "عروض الباقات", type: "text", special: true },
];

const bestSelling = [
{ 
  name: "شرابات بيضاء كلاسيك", 
  image: "/images/886abd6b-b605-4d7e-8c23-2a49ec0a37aa.jpeg" 
},
  { name: "شرابات ديزني للأطفال", icon: "🎀" },
  { name: "شرابات ميكي وأصحابه", icon: "🐭" },
  { name: "شرابات أرقام رياضية", icon: "🏃" },
];

const differentProducts = [
  { name: "Flames", icon: "🔥", price: 99, oldPrice: 130 },
  { name: "Classic Pack", icon: "🧦", price: 99, oldPrice: 130 },
  { name: "Chip & Dale", icon: "🐿️", price: 99, oldPrice: 130 },
  { name: "Ice Cream", icon: "🍦", price: 99, oldPrice: 130 },
];

const features = [
  {
    icon: "🍃",
    title: "خامة قطنية",
    text: "مريحة",
  },
  {
    icon: "🏅",
    title: "جودة عالية",
    text: "تدوم طويلاً",
  },
  {
    icon: "🚚",
    title: "شحن سريع",
    text: "لكل المحافظات",
  },
  {
    icon: "💵",
    title: "الدفع",
    text: "عند الاستلام",
  },
];

const bundles = [
  {
    quantity: "10",
    price: "499",
    oldPrice: "650",
    label: "أفضل قيمة",
  },
  {
    quantity: "6",
    price: "349",
    oldPrice: "450",
    label: "الأكثر طلباً",
    hot: true,
  },
  {
    quantity: "3",
    price: "199",
    oldPrice: "250",
    label: "اختيار رائع",
  },
];

function App() {
  const [products, setProducts] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [cart, setCart] = useState([]);
const [cartOpen, setCartOpen] = useState(false);

const addToCart = (product) => {
  setCart((current) => {
    const productKey = product.id || product.name;

    const existing = current.find(
      (item) => (item.id || item.name) === productKey
    );

    if (existing) {
      return current.map((item) =>
        (item.id || item.name) === productKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...current,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
};

const increaseQuantity = (productKey) => {
  setCart((current) =>
    current.map((item) =>
      (item.id || item.name) === productKey
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (productKey) => {
  setCart((current) =>
    current
      .map((item) =>
        (item.id || item.name) === productKey
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const cartTotal = cart.reduce(
  (total, item) => total + Number(item.price || 0) * item.quantity,
  0
);

const cartItemsCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        return;
      }
      
      setProducts(data || []);
    }

    loadProducts();
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);

      document
        .querySelectorAll(".reveal")
        .forEach((element) => {
          const rect = element.getBoundingClientRect();

          if (rect.top < window.innerHeight - 80) {
            element.classList.add("visible");
          }
        });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (index) => {
    setFavorites((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return selectedProduct ? (
  <div className="product-details-page">
    <button
      className="back-button"
      onClick={() => setSelectedProduct(null)}
    >
      <i className="fa-solid fa-arrow-right" />
      العودة للمنتجات
    </button>

    <div className="product-details">
      <div className="product-details-image">
        {selectedProduct.image ? (
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />
        ) : (
          <span>{selectedProduct.icon || "🧦"}</span>
        )}
      </div>

      <div className="product-details-info">
        <div className="eyebrow">SOCKSY COLLECTION</div>

        <h1>{selectedProduct.name}</h1>

        <p>
          {selectedProduct.description || "جودة وراحة في كل خطوة"}
        </p>

        <div className="price-row">
          <strong>{selectedProduct.price} جنيه</strong>

          {selectedProduct.old_price && (
            <del>{selectedProduct.old_price} جنيه</del>
          )}
        </div>

       <button
  className="primary-button"
  onClick={() => addToCart(selectedProduct)}
>
  أضف للسلة
  <i className="fa-solid fa-bag-shopping" />
</button>
      </div>
    </div>
  </div>
) : cartOpen ? (
  <div className="cart-page">
    <button
      className="back-button"
      onClick={() => setCartOpen(false)}
    >
      <i className="fa-solid fa-arrow-right" />
      العودة للتسوق
    </button>

    <div className="cart-container">

      <div className="cart-heading">
        <div>
          <div className="eyebrow">YOUR BAG</div>
          <h1>سلة التسوق</h1>
        </div>

        {cart.length > 0 && (
          <span className="cart-count">
            {cartItemsCount} منتجات
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            🛍️
          </div>

          <h2>السلة فارغة</h2>

          <p>
            لسه مفيش منتجات في السلة، اختار الجوارب اللي تحبها وابدأ التسوق.
          </p>

          <button
            className="primary-button"
            onClick={() => setCartOpen(false)}
          >
            ابدأ التسوق
            <i className="fa-solid fa-arrow-left" />
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">

            {cart.map((item) => {
              const productKey = item.id || item.name;
              const itemTotal =
                Number(item.price || 0) * item.quantity;

              return (
                <div
                  className="cart-item"
                  key={productKey}
                >

                  <div className="cart-item-image">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>
                        {item.icon || "🧦"}
                      </span>
                    )}
                  </div>

                  <div className="cart-item-info">

                    <h3>{item.name}</h3>

                    <p>
                      {item.description ||
                        "جودة وراحة في كل خطوة"}
                    </p>

                    <div className="cart-item-price">
                      {item.price} جنيه
                    </div>

                    <div className="cart-item-bottom">

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            decreaseQuantity(productKey)
                          }
                          aria-label="تقليل الكمية"
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(productKey)
                          }
                          aria-label="زيادة الكمية"
                        >
                          +
                        </button>

                      </div>

                      <strong className="cart-item-total">
                        {itemTotal} جنيه
                      </strong>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="cart-summary">

            <div className="summary-row">
              <span>عدد المنتجات</span>
              <strong>{cartItemsCount}</strong>
            </div>

            <div className="summary-row">
              <span>الإجمالي</span>
              <strong className="grand-total">
                {cartTotal} جنيه
              </strong>
            </div>

            <div className="summary-note">
              🚚 الشحن يتم حسابه عند إتمام الطلب
            </div>

            <button
              className="checkout-button"
              onClick={() => {
                alert("سيتم تجهيز صفحة إتمام الطلب في الخطوة القادمة.");
              }}
            >
              إتمام الطلب
              <i className="fa-solid fa-arrow-left" />
            </button>

          </div>
        </>
      )}
    </div>
  </div>
) : (
    <div className="app" dir="rtl">
      {/* Announcement */}
      <div className="announcement">
        🔥 عرض الإفتتاح: خصم 15% على أول طلب – استخدم كود:
        <strong> SOCKSY15 </strong>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-icons">
            <button aria-label="حسابي">
              <i className="fa-regular fa-user" />
            </button>

            <button aria-label="البحث">
              <i className="fa-solid fa-magnifying-glass" />
            </button>

            <button
              className="cart-button"
              aria-label="حقيبة التسوق"
              onClick={() => setCartOpen(true)}
            >
              <i className="fa-solid fa-bag-shopping" />
              <span>{cartItemsCount}</span>
            </button>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <i className="fa-solid fa-bars" />
          </button>

          <div
            className="logo"
            onClick={() => scrollToSection("home")}
            role="button"
            tabIndex="0"
          >
            <div className="logo-icon">
             <span className="sock-icon">🧦</span>
            </div>

            <div>
              <div className="logo-name">SOCKSY</div>
              <div className="logo-tagline">STEP INTO YOUR STYLING</div>
            </div>
          </div>

          <nav className="desktop-nav">
            <button onClick={() => scrollToSection("home")}>الرئيسية</button>
            <button onClick={() => scrollToSection("products")}>
              المنتجات
            </button>
            <button onClick={() => scrollToSection("bundles")}>
              عروض الباقات
            </button>
            <button onClick={() => scrollToSection("contact")}>
              تواصل معنا
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`drawer-backdrop ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`mobile-drawer ${menuOpen ? "active" : ""}`}>
        <div className="drawer-header">
          <div className="logo-name">SOCKSY</div>

          <button onClick={() => setMenuOpen(false)} aria-label="إغلاق">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <button onClick={() => scrollToSection("home")}>الرئيسية</button>
        <button onClick={() => scrollToSection("products")}>المنتجات</button>
        <button onClick={() => scrollToSection("bundles")}>
          عروض الباقات
        </button>
        <button onClick={() => scrollToSection("contact")}>
          تواصل معنا
        </button>
      </aside>

      <main>
        {/* Hero */}
        <section className="hero-section reveal" id="home">
          <div className="hero-media">
            <div className="hero-ring ring-one" />
            <div className="hero-ring ring-two" />

            <div className="hero-circle">
            <span className="sock-icon">🧦</span>
              <span>SOCKSY</span>
            </div>

            <div className="floating-mini mini-one">🧦</div>
            <div className="floating-mini mini-two">★</div>
            <div className="floating-mini mini-three">♡</div>
          </div>

          <div className="hero-content">
            <div className="eyebrow">STEP INTO YOUR STYLING</div>

            <h1>SOCKSY</h1>

            <p>
              استايلك يبدأ من خطواتك، جوارب بتصميمات عصرية وجودة عالية تناسب كل
              ستايل، وكل يوم.
            </p>

            <div className="features">
              {features.map((feature) => (
                <div className="feature" key={feature.title}>
                  <div className="feature-icon">{feature.icon}</div>

                  <div>
                    <strong>{feature.title}</strong>
                    <span>{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="primary-button"
              onClick={() => scrollToSection("products")}
            >
              تسوق الآن
              <i className="fa-solid fa-arrow-left" />
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="section reveal" id="categories">
          <div className="section-heading">
            <div className="eyebrow">FIND YOUR STYLE</div>
            <h2>عرض الباقات</h2>
            <p>اختار الستايل اللي يناسبك</p>
          </div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <button
                className={`category-item ${
                  category.special ? "special" : ""
                }`}
                key={index}
                onClick={() =>
                  category.special
                    ? scrollToSection("bundles")
                    : scrollToSection("products")
                }
              >
                <div className="category-circle">
                  <span>{category.icon}</span>
                </div>

                <strong>{category.title}</strong>
              </button>
            ))}
          </div>
        </section>

        {/* Best Selling */}
<section className="section reveal" id="products">
  <div className="section-heading">
    <div className="eyebrow">OUR FAVORITES</div>
    <h2>الأكثر مبيعاً</h2>
    <p>اختيارات عملائنا المفضلة</p>
  </div>

  <div className="products-grid">
    {(products.length > 0 ? products : bestSelling).map((product, index) => (
      <article className="product-card" key={product.id || product.name}>
        <button
          className={`favorite ${
            favorites.includes(index) ? "active" : ""
          }`}
          onClick={() => toggleFavorite(index)}
          aria-label="إضافة للمفضلة"
        >
          <i
            className={
              favorites.includes(index)
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart"
            }
          />
        </button>

        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span>{product.icon}</span>
          )}
        </div>

        <div className="product-info">
          <h3>{product.name}</h3>
          <p>
            {product.description || "جودة وراحة في كل خطوة"}
          </p>

         <div className="price-row">
  <strong>{product.price} جنيه</strong>
  {product.old_price && (
    <del>{product.old_price} جنيه</del>
  )}
</div>
          <button
  className="product-button"
  onClick={() => setSelectedProduct(product)}
>
  عرض المنتج
  <i className="fa-solid fa-arrow-left" />
</button>
        </div>
      </article>
    ))}
  </div>

  <div className="center-button">
    <button className="outline-button">
      عرض جميع المنتجات
      <i className="fa-solid fa-arrow-left" />
    </button>
  </div>
</section>

        {/* Different Socks */}
        <section className="section reveal different-section">
          <div className="section-heading">
            <div className="eyebrow">STEP UP</div>
            <h2>شرابات مختلفة</h2>
            <p>تصميمات تخلي خطواتك مختلفة</p>
          </div>

          <div className="products-grid">
            {differentProducts.map((product, index) => (
              <article className="product-card different-card" key={product.name}>
                <div className="discount-badge">26%</div>

                <button
                  className={`favorite ${
                    favorites.includes(index + 10) ? "active" : ""
                  }`}
                  onClick={() => toggleFavorite(index + 10)}
                  aria-label="إضافة للمفضلة"
                >
                  <i
                    className={
                      favorites.includes(index + 10)
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
                    }
                  />
                </button>

                <div className="product-image">
                  <span>{product.icon}</span>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <div className="price-row">
                    <strong>{product.price} جنيه</strong>
                    <del>{product.oldPrice} جنيه</del>
                  </div>

                  <button className="product-button">
                    أضف للسلة
                    <i className="fa-solid fa-bag-shopping" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bundles */}
        <section className="section reveal bundles-section" id="bundles">
          <div className="section-heading">
            <div className="eyebrow">SAVE MORE</div>
            <h2>عروض الباقات</h2>
            <p>كل ما تزود، كل ما توفر</p>
          </div>

          <div className="bundles-layout">
            {bundles.map((bundle) => (
              <article
                className={`bundle-card ${bundle.hot ? "hot" : ""}`}
                key={bundle.quantity}
              >
                <div className="bundle-label">{bundle.label}</div>

                <div className="bundle-number">
                  {bundle.quantity}
                  <span>شرابات</span>
                </div>

                <div className="bundle-price">
                  <strong>{bundle.price}</strong>
                  <span>جنيه</span>
                </div>

                <del>{bundle.oldPrice} جنيه</del>

                <button>اختار الباقة</button>
              </article>
            ))}

            <article className="bundle-cta">
              <div className="eyebrow">عرض محدود</div>

              <h3>ابني صندوقك الخاص</h3>

              <p>
                اختر عدد الشرابات والتصميمات التي تحبها ووفّر أكثر!
              </p>

              <button
                className="primary-button"
                onClick={() => scrollToSection("products")}
              >
                ابدأ اختيارك
                <i className="fa-solid fa-arrow-left" />
              </button>
            </article>
          </div>
        </section>

        {/* Trust */}
        <section className="trust-section reveal">
          <div className="trust-item">
            <div className="trust-icon">
              <i className="fa-solid fa-headset" />
            </div>
            <div>
              <strong>خدمة عملاء 24/7</strong>
              <span>دايمًا معاك</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <div>
              <strong>دفع آمن عند الاستلام</strong>
              <span>أمانك أولويتنا</span>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <i className="fa-solid fa-truck-fast" />
            </div>
            <div>
              <strong>شحن لجميع المحافظات</strong>
              <span>نوصل لحد بابك</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-logo">
          <div className="logo-icon">
            <span className="sock-icon">🧦</span>
          </div>

          <div>
            <div className="logo-name">SOCKSY</div>
            <div className="logo-tagline">STEP INTO YOUR STYLING</div>
          </div>
        </div>

        <p>© 2026 SOCKSY. كل الحقوق محفوظة.</p>
      </footer>

      {/* Back To Top */}
          <button

        className={`back-to-top ${showTop ? "show" : ""}`}

        onClick={scrollToTop}

        aria-label="العودة للأعلى"

      >

        <i className="fa-solid fa-arrow-up" />

      </button>

    </div>
  );
}
export default App;