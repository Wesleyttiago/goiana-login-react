import { useRef, useState } from 'react';
import Icon from './Icon.jsx';

const STORAGE_KEY = 'goiana-login:remembered-email';

function getRememberedEmail() {
  try {
    return (localStorage.getItem(STORAGE_KEY) || '').slice(0, 254);
  } catch {
    return '';
  }
}

export default function LoginForm({ onOpenDialog, onLogin }) {
  const [email, setEmail] = useState(getRememberedEmail);
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(() => Boolean(getRememberedEmail()));
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function updateField(name, value) {
    if (name === 'email') setEmail(value);
    else setPassword(value);
    setErrors((current) => ({ ...current, [name]: undefined }));
    setFeedback(null);
  }

  function toggleRememberEmail(event) {
    setRememberEmail(event.target.checked);
    if (!event.target.checked) {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* Armazenamento opcional. */ }
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    const normalizedEmail = email.trim();
    const nextErrors = {};

    if (!normalizedEmail) nextErrors.email = 'Informe seu e-mail para continuar.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) nextErrors.email = 'Digite um e-mail válido, como nome@exemplo.com.';
    if (!password) nextErrors.password = 'Informe sua senha para continuar.';

    setErrors(nextErrors);
    setFeedback(null);
    if (Object.keys(nextErrors).length) {
      (nextErrors.email ? emailRef : passwordRef).current?.focus();
      return;
    }

    setEmail(normalizedEmail);
    try {
      if (rememberEmail) localStorage.setItem(STORAGE_KEY, normalizedEmail);
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* O formulário funciona mesmo sem armazenamento local. */ }

    // A tela não simula uma sessão autenticada. Conecte a API pelo callback onLogin.
    if (!onLogin) {
      setFeedback({ type: 'info', text: 'Esta é uma demonstração. O acesso a uma conta real ainda não está disponível neste protótipo.' });
      return;
    }

    setIsSubmitting(true);
    try {
      await onLogin({ email: normalizedEmail, password });
      setPassword('');
    } catch {
      setFeedback({ type: 'error', text: 'Não foi possível entrar. Confira seus dados e tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateCapsLock(event) {
    setCapsLock(event.getModifierState('CapsLock'));
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate aria-label="Acessar conta" aria-busy={isSubmitting}>
      <div className="field-group">
        <label htmlFor="email">E-mail</label>
        <div className={`input-wrap ${errors.email ? 'input-error' : ''}`}>
          <Icon name="mail" />
          <input ref={emailRef} id="email" name="email" type="email" autoComplete="username" inputMode="email" maxLength={254} placeholder="Seu e-mail" value={email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} disabled={isSubmitting} required />
        </div>
        {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
      </div>

      <div className="field-group">
        <label htmlFor="password">Senha</label>
        <div className={`input-wrap ${errors.password ? 'input-error' : ''}`}>
          <Icon name="lock" />
          <input ref={passwordRef} id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Digite sua senha" value={password} onChange={(event) => updateField('password', event.target.value)} onKeyDown={updateCapsLock} onKeyUp={updateCapsLock} onBlur={() => setCapsLock(false)} aria-invalid={Boolean(errors.password)} aria-describedby={[errors.password && 'password-error', capsLock && 'caps-lock'].filter(Boolean).join(' ') || undefined} disabled={isSubmitting} required />
          <button className="password-toggle" type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={showPassword} disabled={isSubmitting}>
            <Icon name={showPassword ? 'eyeOff' : 'eye'} />
          </button>
        </div>
        {errors.password && <p id="password-error" className="field-error">{errors.password}</p>}
        {capsLock && <p id="caps-lock" className="caps-lock">A tecla Caps Lock está ativada.</p>}
      </div>

      <div className="form-options">
        <label className="remember-label">
          <input type="checkbox" checked={rememberEmail} onChange={toggleRememberEmail} disabled={isSubmitting} />
          <span>Lembrar meu e-mail</span>
        </label>
        <button type="button" className="text-button" onClick={() => onOpenDialog('password')}>Esqueceu sua senha?</button>
      </div>

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <><span className="spinner" /> Entrando...</> : <>Entrar na minha conta <Icon name="arrow" /></>}
      </button>

      {feedback && (
        <div className={`form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
          <Icon name="info" size={19} /><span>{feedback.text}</span>
        </div>
      )}

      <div className="form-divider"><span>É seu primeiro acesso?</span></div>
      <button type="button" className="register-button" onClick={() => onOpenDialog('register')}>Solicitar cadastro <Icon name="arrow" size={18} /></button>
    </form>
  );
}
