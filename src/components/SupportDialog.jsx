import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

const content = {
  help: {
    title: 'Como podemos ajudar?',
    text: 'Para experimentar a tela, preencha o e-mail e a senha. Você pode mostrar a senha e escolher lembrar apenas o e-mail neste navegador.',
    note: 'Use dados fictícios para testar. Este projeto acadêmico não envia os dados para nenhum serviço de autenticação.',
  },
  password: {
    title: 'Recuperação de acesso',
    text: 'No sistema final, você poderá recuperar sua senha com o e-mail cadastrado.',
    note: 'Esta opção é demonstrativa. Nenhuma solicitação será enviada e nenhuma senha será alterada neste protótipo.',
  },
  register: {
    title: 'Seu primeiro acesso',
    text: 'O cadastro será disponibilizado conforme as regras do sistema. Você também poderá solicitar acesso à equipe responsável pelo projeto.',
    note: 'Neste protótipo, o cadastro é apenas demonstrativo e não cria uma conta real.',
  },
  about: {
    title: 'Sobre este protótipo',
    text: 'Tela desenvolvida em React para estudo, com uma identidade visual inspirada no portal da Prefeitura de Goiana, em Pernambuco.',
    note: 'Este projeto não é um serviço oficial da Prefeitura. A senha nunca é armazenada; somente o e-mail pode ser lembrado, se você escolher essa opção.',
  },
};

export default function SupportDialog({ type, onClose }) {
  const dialogRef = useRef(null);
  const selected = content[type];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && !dialog.open) dialog.showModal();
    else if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <dialog ref={dialogRef} className="support-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {selected && <div className="dialog-inner">
        <button className="dialog-close" type="button" aria-label="Fechar janela" onClick={onClose}><Icon name="close" /></button>
        <span className="dialog-icon"><Icon name={type === 'about' ? 'info' : 'help'} size={25} /></span>
        <h2 id="dialog-title">{selected.title}</h2>
        <p id="dialog-description">{selected.text}</p>
        <p className="dialog-note">{selected.note}</p>
        <button className="submit-button" type="button" onClick={onClose}>Entendi <Icon name="check" size={18} /></button>
      </div>}
    </dialog>
  );
}
