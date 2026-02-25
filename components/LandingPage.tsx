/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */

import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">AI Web Uygulama Oluşturucu</h1>
          <p className="hero-subtitle">
            YouTube videolarından yapay zeka ile <br />
            profesyonel web uygulamaları oluşturun
          </p>
          <div className="hero-buttons">
            <button onClick={onGetStarted} className="btn-primary-large">
              Hemen Başla
              <span className="arrow">→</span>
            </button>
            <a href="#features" className="btn-secondary-large">
              Özellikler
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <h2 className="section-title">Neler Yapabilirsiniz?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📹</div>
              <h3>Video Analizi</h3>
              <p>YouTube videolarını AI ile analiz edin ve içeriği anlayın</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Destekli Kod Üretimi</h3>
              <p>Gemini AI ile tam işlevsel web uygulamaları oluşturun</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>9 Farklı Şablon</h3>
              <p>Flowchart, Quiz, Kanban, Dashboard, Timeline ve daha fazlası</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Tek Dosya HTML</h3>
              <p>Hemen kullanılabilir, bağımsız web uygulamaları</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Canlı Kod Editörü</h3>
              <p>Monaco Editor ile kodu anında düzenleyin ve görün</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>%100 Responsive</h3>
              <p>Mobil, tablet ve desktop'ta kusursuz çalışır</p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="use-cases-section">
          <h2 className="section-title">Örnek Kullanım Alanları</h2>
          <div className="use-cases-grid">
            <div className="use-case-card">
              <div className="use-case-number">1</div>
              <h3>Süreç Akışları</h3>
              <p>Flowchart ile algoritma, iş akışı ve karar ağaçları</p>
              <div className="use-case-tag">Operasyon</div>
            </div>
            <div className="use-case-card">
              <div className="use-case-number">2</div>
              <h3>Görev Yönetimi</h3>
              <p>Kanban board ile proje takibi ve iş organizasyonu</p>
              <div className="use-case-tag">Proje</div>
            </div>
            <div className="use-case-card">
              <div className="use-case-number">3</div>
              <h3>Veri Analizi</h3>
              <p>Dashboard ile istatistikler ve veri görselleştirme</p>
              <div className="use-case-tag">Analitik</div>
            </div>
            <div className="use-case-card">
              <div className="use-case-number">4</div>
              <h3>Ürün Karşılaştırma</h3>
              <p>Karşılaştırma tablosu ile fiyat ve özellik analizi</p>
              <div className="use-case-tag">E-Ticaret</div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <h2 className="section-title">Nasıl Çalışır?</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>YouTube URL'si Yapıştırın</h3>
                <p>Öğrenmek istediğiniz konuda bir YouTube videosu seçin</p>
              </div>
            </div>
            <div className="step-arrow">↓</div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI Videoyu Analiz Eder</h3>
                <p>Gemini AI videoyu izler, transkript çıkarır ve içeriği anlar</p>
              </div>
            </div>
            <div className="step-arrow">↓</div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Uygulama Oluşturulur</h3>
                <p>Seçtiğiniz şablona göre profesyonel uygulama otomatik kodlanır</p>
              </div>
            </div>
            <div className="step-arrow">↓</div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Önizle ve Düzenle</h3>
                <p>Uygulamayı kullanın, kodu görün veya özelleştirin</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Hemen Deneyin!</h2>
          <p>YouTube videolarından profesyonel web uygulamaları oluşturmaya başlayın</p>
          <button onClick={onGetStarted} className="btn-primary-large">
            Ücretsiz Başla
            <span className="arrow">→</span>
          </button>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <p>Gemini AI ile güçlendirilmiştir</p>
          <p className="footer-note">Aaron Wade tarafından tasarlanan orijinal konsepte dayanır</p>
        </footer>
      </div>

      <style>{`
        .landing-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          overflow-y: auto;
          color: white;
        }

        .landing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 4rem 0 6rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #fff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary-large {
          background: white;
          color: #667eea;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .btn-primary-large:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .btn-secondary-large {
          background: rgba(255,255,255,0.1);
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.125rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          border: 2px solid rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }

        .btn-secondary-large:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.5);
        }

        .arrow {
          font-size: 1.5rem;
        }

        /* Features Section */
        .features-section {
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          font-weight: 600;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.3);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          opacity: 0.9;
          line-height: 1.6;
        }

        /* Use Cases Section */
        .use-cases-section {
          padding: 4rem 0;
        }

        .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .use-case-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          position: relative;
          transition: all 0.3s ease;
        }

        .use-case-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.15);
        }

        .use-case-number {
          position: absolute;
          top: -15px;
          right: 20px;
          background: white;
          color: #667eea;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .use-case-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .use-case-card p {
          opacity: 0.9;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .use-case-tag {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
        }

        /* How It Works Section */
        .how-it-works-section {
          padding: 4rem 0;
        }

        .steps-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .step {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .step-number {
          background: white;
          color: #667eea;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .step-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .step-content p {
          opacity: 0.9;
          line-height: 1.6;
        }

        .step-arrow {
          text-align: center;
          font-size: 2rem;
          margin: 0.5rem 0;
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding: 4rem 0;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          margin: 2rem 0;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        /* Footer */
        .landing-footer {
          text-align: center;
          padding: 2rem 0;
          opacity: 0.8;
        }

        .footer-note {
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .landing-container {
            padding: 1rem;
          }

          .hero-section {
            padding: 2rem 0 3rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .features-grid,
          .use-cases-grid {
            grid-template-columns: 1fr;
          }

          .cta-section h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
