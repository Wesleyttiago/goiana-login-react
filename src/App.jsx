import { useState } from 'react';
import logo from './assets/goiana-logo.png';
import CityIllustration from './components/CityIllustration.jsx';
import Icon from './components/Icon.jsx';
import LoginForm from './components/LoginForm.jsx';
import SupportDialog from './components/SupportDialog.jsx';

export default function App() {
  const [dialog, setDialog] = useState(null);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#login">Ir para o formulário de login</a>
      <div className="brand-stripe" aria-hidden="true"><span /><span /><span /><span /></div>

      <header className="site-header">
        <div className="brand-lockup">
          <img src={logo} className="brand-logo" alt="Goiana — Crescendo juntos, cuidando da gente" width="147" height="76" />
          <span className="brand-separator" aria-hidden="true" />
          <div className="portal-name"><strong>Goiana Digital</strong><span>Portal de acesso</span></div>
        </div>
        <button className="help-button" type="button" aria-label="Precisa de ajuda?" onClick={() => setDialog('help')}><Icon name="help" size={19} /><span>Precisa de ajuda?</span></button>
      </header>

      <main className="main-content">
        <section className="welcome-panel" aria-labelledby="welcome-title">
          <div className="hero-content">
            <span className="location-tag"><span className="status-dot" /> GOIANA, PERNAMBUCO</span>
            <h1 id="welcome-title">Nossa cidade.<br />{' '}Mais perto<br />{' '}<span>de você.</span></h1>
            <p className="hero-description">Um novo jeito de se conectar com Goiana.<br className="desktop-break" /> Mais simples, mais próximo, mais digital.</p>
            <div className="hero-detail"><span className="hero-detail-icon"><Icon name="pin" size={20} /></span><span>Da nossa história para o nosso futuro.</span></div>
          </div>
          <CityIllustration />
          <div className="hero-bottom"><span>Conexão que aproxima.</span><div className="mini-colors" aria-hidden="true"><i /><i /><i /><i /></div></div>
        </section>

        <section className="login-panel" id="login" aria-labelledby="login-title" tabIndex={-1}>
          <div className="login-content">
            <span className="login-symbol"><Icon name="lock" size={25} /></span>
            <div className="login-heading">
              <span className="eyebrow">BEM-VINDO AO GOIANA DIGITAL</span>
              <h2 id="login-title">Acesse sua conta</h2>
              <p>Que bom ter você por aqui.<br />Informe seus dados para continuar.</p>
            </div>
            <LoginForm onOpenDialog={setDialog} />
            <div className="account-note"><Icon name="shield" size={18} /><span>Protótipo acadêmico · Use dados fictícios.</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p><strong>Goiana Digital</strong><span aria-hidden="true"> · </span>Projeto acadêmico, sem vínculo oficial.</p>
        <button className="footer-link" type="button" onClick={() => setDialog('about')}>Sobre este protótipo <Icon name="arrow" size={15} /></button>
      </footer>
      <SupportDialog type={dialog} onClose={() => setDialog(null)} />
    </div>
  );
}
