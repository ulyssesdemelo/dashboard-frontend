import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const Clientes = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [linhaHover, setLinhaHover] = useState(null);

  // Busca os clientes ao carregar a página
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clientes');
      setClientes(response.data.clientes);
      setError('');
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Monta o código CVJ a partir do id (id 1 -> CVJ-0001)
  const formatCVJ = (id) => {
    return `CVJ-${String(id).padStart(4, '0')}`;
  };

  // Formata a data: 2026-01-21... -> 21.01.2026
  const formatarData = (dataISO) => {
    if (!dataISO) return '—';
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  // Formata a hora: 2026-01-21T10:34:10 -> 10:34:10
  const formatarHora = (dataISO) => {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    return data.toLocaleTimeString('pt-BR');
  };

  // Deletar cliente
  const handleDelete = async (id, nome) => {
    const confirmar = window.confirm(`Tem certeza que deseja excluir "${nome}"?`);
    if (!confirmar) return;

    try {
      await api.delete(`/clientes/${id}`);
      setClientes(clientes.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Erro ao excluir cliente');
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Clientes</h1>
          <p style={styles.subtitle}>{clientes.length} cliente(s) cadastrado(s)</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/clientes/novo')}
          style={styles.newButton}
        >
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

      {/* Erro */}
      {error && <div style={styles.errorCard}>{error}</div>}

      {/* Tabela */}
      <div style={styles.card}>
        {loading ? (
          <p style={styles.empty}>Carregando...</p>
        ) : clientes.length === 0 ? (
          <p style={styles.empty}>
            Nenhum cliente cadastrado ainda. Clique em "Novo Cliente" para começar!
          </p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#CVJ</th>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>WhatsApp</th>
                <th style={styles.th}>E-mail</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Data Criada</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.id}
                  style={styles.tr}
                  onMouseEnter={() => setLinhaHover(cliente.id)}
                  onMouseLeave={() => setLinhaHover(null)}
                >
                  <td style={styles.td}>{formatCVJ(cliente.id)}</td>
                  <td style={styles.td}>
                    <div style={styles.nomeCliente}>
                      {cliente.nome} {cliente.sobrenome}
                    </div>
                    <div style={{
                      ...styles.rowActions,
                      visibility: linhaHover === cliente.id ? 'visible' : 'hidden',
                    }}>
                      <span
                        style={styles.actionLink}
                        onClick={() => navigate(`/dashboard/clientes/${cliente.id}`)}
                      >
                        Ver
                      </span>
                      <span style={styles.actionSeparator}>|</span>
                      <span
                        style={styles.actionLink}
                        onClick={() => navigate(`/dashboard/clientes/${cliente.id}?editar=true`)}
                      >
                        Editar
                      </span>
                      <span style={styles.actionSeparator}>|</span>
                      <span
                        style={styles.actionLinkDanger}
                        onClick={() => handleDelete(cliente.id, `${cliente.nome} ${cliente.sobrenome}`)}
                      >
                        Deletar
                      </span>
                    </div>
                  </td>
                  <td style={styles.td}>{cliente.whatsapp || '—'}</td>
                  <td style={styles.td}>{cliente.email || '—'}</td>
                  <td style={styles.td}>
                    {cliente.ativo ? (
                      <span style={styles.badgeActive}>Ativo</span>
                    ) : (
                      <span style={styles.badgeInactive}>Inativo</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.dataText}>
                      {formatarData(cliente.created_at)}
                    </div>
                    <div style={styles.horaText}>
                      {formatarHora(cliente.created_at)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  title: { fontSize: '24px', color: theme.text, margin: 0 },
  subtitle: { fontSize: '14px', color: theme.textMuted, margin: '4px 0 0 0' },
  newButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    backgroundColor: theme.primary,
    color: theme.primaryText,
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: `1px solid ${theme.border}`,
    overflow: 'hidden',
  },
  nomeCliente: {
    fontWeight: '600',
    color: theme.text,
    marginBottom: '4px',
  },
  rowActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
  },
  actionLink: {
    color: theme.textMuted,
    cursor: 'pointer',
  },
  actionLinkDanger: {
    color: theme.danger,
    cursor: 'pointer',
  },
  actionSeparator: {
    color: theme.border,
  },
  dataText: {
    fontSize: '13px',
    color: theme.text,
  },
  horaText: {
    fontSize: '12px',
    color: theme.textMuted,
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: theme.textMuted,
    borderBottom: `1px solid ${theme.border}`,
    backgroundColor: theme.surfaceAlt,
  },
  tr: { borderBottom: `1px solid ${theme.border}` },
  td: {
    padding: '14px 16px',
    fontSize: '14px',
    color: theme.text,
  },
  badgeActive: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  badgeInactive: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    color: theme.textMuted,
    fontSize: '15px',
  },
  errorCard: {
    backgroundColor: '#fdecea',
    color: '#e74c3c',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
});

export default Clientes;