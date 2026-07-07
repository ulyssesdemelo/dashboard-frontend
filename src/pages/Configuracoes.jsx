import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const Configuracoes = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  // Qual seção do menu está ativa
  const [secaoAtiva, setSecaoAtiva] = useState('perfil');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [alterado, setAlterado] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  // Itens do menu lateral (por enquanto só Perfil; cresce aqui no futuro)
  const menuItens = [
    { id: 'perfil', label: 'Meu Perfil', icon: User, grupo: 'Conta' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/auth/profile');
        setNome(response.data.user.name || '');
        setEmail(response.data.user.email || '');
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError('Erro ao carregar seu perfil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleNomeChange = (valor) => {
    setNome(valor);
    setAlterado(true);
    setSuccessMsg('');
  };

  const handleSalvar = async () => {
    if (!nome || nome.trim().length < 3) {
      setError('Nome deve ter no mínimo 3 caracteres');
      return;
    }
    try {
      setSalvando(true);
      setError('');
      await api.put('/auth/profile', { name: nome });
      setSuccessMsg('Perfil atualizado com sucesso!');
      setAlterado(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div>
      <h1 style={styles.pageTitle}>Configurações</h1>

      <div style={styles.layout}>

        {/* MENU LATERAL */}
        <aside style={styles.sidebar}>
          <span style={styles.grupoLabel}>Conta</span>
          {menuItens.map((item) => (
            <div
              key={item.id}
              onClick={() => setSecaoAtiva(item.id)}
              style={{
                ...styles.menuItem,
                ...(secaoAtiva === item.id ? styles.menuItemActive : {}),
              }}
            >
              <item.icon size={17} />
              {item.label}
            </div>
          ))}
        </aside>

        {/* CONTEÚDO */}
        <main style={styles.content}>
          {loading ? (
            <p style={{ color: theme.text }}>Carregando...</p>
          ) : (
            <>
              {/* SEÇÃO: Meu Perfil */}
              {secaoAtiva === 'perfil' && (
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>Meu Perfil</h2>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Nome</label>
                    <input
                      style={styles.input}
                      value={nome}
                      onChange={(e) => handleNomeChange(e.target.value)}
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>E-mail</label>
                    <input
                      style={{ ...styles.input, ...styles.inputDisabled }}
                      value={email}
                      disabled
                    />
                    <span style={styles.hint}>
                      O e-mail é usado para login e não pode ser alterado aqui por enquanto.
                    </span>
                  </div>

                  {successMsg && <div style={styles.successMsg}>{successMsg}</div>}
                  {error && <div style={styles.serverError}>{error}</div>}

                  <button
                    onClick={handleSalvar}
                    disabled={!alterado || salvando}
                    style={{
                      ...styles.saveButton,
                      opacity: alterado && !salvando ? 1 : 0.4,
                      cursor: alterado && !salvando ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  pageTitle: { fontSize: '24px', color: theme.text, marginBottom: '24px' },
  layout: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '220px',
    flexShrink: 0,
    backgroundColor: theme.surface,
    borderRadius: '10px',
    border: `1px solid ${theme.border}`,
    padding: '12px',
  },
  grupoLabel: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    color: theme.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '8px 10px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.text,
    cursor: 'pointer',
    marginBottom: '2px',
  },
  menuItemActive: {
    backgroundColor: theme.primary,
    color: theme.primaryText,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  card: {
    backgroundColor: theme.surface,
    padding: '28px',
    borderRadius: '10px',
    border: `1px solid ${theme.border}`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    maxWidth: '600px',
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: theme.text,
    margin: '0 0 20px 0',
    paddingBottom: '12px',
    borderBottom: `1px solid ${theme.border}`,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '20px',
  },
  label: { fontSize: '13px', fontWeight: '600', color: theme.text },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: `1.5px solid ${theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputDisabled: {
    backgroundColor: theme.surfaceAlt,
    color: theme.textMuted,
    cursor: 'not-allowed',
  },
  hint: { fontSize: '12px', color: theme.textMuted },
  successMsg: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  serverError: {
    backgroundColor: '#fdecea',
    color: '#e74c3c',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  saveButton: {
    padding: '11px 24px',
    backgroundColor: theme.primary,
    color: theme.primaryText,
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
  },
});

export default Configuracoes;