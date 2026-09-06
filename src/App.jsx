import React from "react";
import "./App.css";
function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">SOCKSY</div>
        <nav className="nav">
          <a href="#home">الرئيسية</a>
          <a href="#products">المنتجات</a>
          <a href="#about">عن SOCKSY</a>
          <a href="#contact">تواصل معنا</a>
        </nav>
        <button className="cartButton">
          🛒 السلة
        </button>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="heroContent">
            <p className="smallTitle">SOCKSY</p>
            <h1>
              خلي خطوتك
              <br />
              <span>أكتر راحة وأناقة</span>
            </h1>
            <p className="heroText">
              اكتشف تشكيلتنا من الجوارب المريحة والعصرية
              المصممة لكل خطوة في يومك.
            </p>
            <button className="shopButton">
              تسوق الآن
            </button>
          </div>
          <div className="heroImage">
            🧦
          </div>
        </section>
        <section id="products" className="products">
          <div className="sectionTitle">
            <p>اختياراتنا</p>
            <h2>منتجات SOCKSY</h2>
          </div>
          <div className="productGrid">
            <div className="productCard">
              <div className="productImage">🧦</div>
              <h3>Classic Socks</h3>
              <p>جوارب كلاسيك مريحة للاستخدام اليومي</p>
              <strong>150 جنيه</strong>
              <button>أضف للسلة</button>
            </div>
            <div className="productCard">
              <div className="productImage">🧦</div>
              <h3>Sport Socks</h3>
              <p>جوارب رياضية للراحة والحركة</p>
              <strong>180 جنيه</strong>
              <button>أضف للسلة</button>
            </div>
            <div className="productCard">
              <div className="productImage">🧦</div>
              <h3>Premium Socks</h3>
              <p>خامة فاخرة وتصميم أنيق</p>
              <strong>220 جنيه</strong>
              <button>أضف للسلة</button>
            </div>
          </div>
        </section>
        <section id="about" className="about">
          <h2>ليه SOCKSY؟</h2>
          <div className="features">
            <div>
              <span>✨</span>
              <h3>جودة عالية</h3>
              <p>خامات مختارة بعناية لتوفير أفضل راحة.</p>
            </div>
            <div>
              <span>🧦</span>
              <h3>تصميم عصري</h3>
              <p>ستايل يناسب إطلالتك اليومية.</p>
            </div>
            <div>
              <span>❤️</span>
              <h3>راحة طول اليوم</h3>
              <p>مصممة لتكون مريحة في كل خطوة.</p>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <h2>تواصل معنا</h2>
          <p>تابعنا وتواصل معنا لمعرفة أحدث منتجات SOCKSY.</p>
          <button>تواصل معنا</button>
        </section>
      </main>
      <footer className="footer">
        <div className="logo">SOCKSY</div>
        <p>© 2026 SOCKSY. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
export default App;
