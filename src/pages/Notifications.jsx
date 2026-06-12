import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const Notifications = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/notifications/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSendToUser = async (e) => {
    e.preventDefault();
    if (!selectedUser || !title || !body) {
      setMessage('Preencha todos os campos!');
      setMessageType('error');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/notifications/send', {
        userId: parseInt(selectedUser),
        title,
        body,
      });
      setMessage(response.data.message);
      setMessageType('success');
      setTitle('');
      setBody('');
      setSelectedUser('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao enviar notificação');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendToAll = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      setMessage('Preencha título e mensagem!');
      setMessageType('error');
      return;
    }
    if (!window.confirm('Enviar notificação para TODOS os usuários?')) {
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await api.post('/notifications/send-all', {
        title,
        body,
      });
      setMessage(response.data.message);
      setMessageType('success');
      setTitle('');
      setBody('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao enviar notificação');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🔔 Enviar Notificações Push</h1>

        {/* Mensagem de feedback */}
        {message && (
          <div
            style={{
              ...styles.message,
              backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
              color: messageType === 'success' ? '#155724' : '#721c24',
            }}
          >
            {message}
          </div>
        )}

        <div style={styles.grid}>
          {/* Card: Enviar para um usuário específico */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📱 Enviar para Usuário Específico</h2>

            <form onSubmit={handleSendToUser}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Selecione o usuário:</label>
                <select
                  style={styles.select}
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email}) - {user.device_count} dispositivo(s)
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Título:</label>
                <input
                  type="text"
                  style={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Nova mensagem!"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mensagem:</label>
                <textarea
                  style={styles.textarea}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Ex: Você tem uma nova atualização..."
                  rows="4"
                />
              </div>

              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Enviando...' : '📤 Enviar para Usuário'}
              </button>
            </form>
          </div>

          {/* Card: Enviar para todos */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📢 Enviar para TODOS os Usuários</h2>

            <form onSubmit={handleSendToAll}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Título:</label>
                <input
                  type="text"
                  style={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Aviso Importante!"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Mensagem:</label>
                <textarea
                  style={styles.textarea}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Ex: Novo recurso disponível no app!"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                style={{ ...styles.button, backgroundColor: theme.danger }}
                disabled={loading}
              >
                {loading ? 'Enviando...' : '📢 Enviar para TODOS'}
              </button>
            </form>
          </div>
        </div>

        {/* Lista de usuários com dispositivos */}
        <div style={styles.usersList}>
          <h3 style={styles.usersTitle}>
            👥 Usuários com dispositivos cadastrados ({users.length})
          </h3>
          {users.length === 0 ? (
            <p style={styles.noUsers}>Nenhum usuário com dispositivo cadastrado ainda.</p>
          ) : (
            <div style={styles.usersGrid}>
              {users.map((user) => (
                <div key={user.id} style={styles.userCard}>
                  <div style={styles.userName}>{user.name}</div>
                  <div style={styles.userEmail}>{user.email}</div>
                  <div style={styles.userDevices}>
                    📱 {user.device_count} dispositivo(s)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  container: {
    minHeight: '100vh',
    backgroundColor: theme.bg,
    padding: '32px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: '24px',
  },
  message: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '15px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  card: {
    backgroundColor: theme.surface,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: `1px solid ${theme.border}`,
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: theme.text,
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: theme.text,
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: `1.5px solid ${theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '12px',
    border: `1.5px solid ${theme.border}`,
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: theme.surface,
    color: theme.text,
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: `1.5px solid ${theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: theme.primary,
    color: theme.primaryText,
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  usersList: {
    backgroundColor: theme.surface,
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    border: `1px solid ${theme.border}`,
  },
  usersTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: theme.text,
    marginBottom: '16px',
  },
  noUsers: {
    color: theme.textMuted,
    textAlign: 'center',
    padding: '20px',
  },
  usersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  },
  userCard: {
    padding: '16px',
    backgroundColor: theme.surfaceAlt,
    borderRadius: '8px',
    border: `1px solid ${theme.border}`,
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: theme.text,
    marginBottom: '4px',
  },
  userEmail: {
    fontSize: '14px',
    color: theme.textMuted,
    marginBottom: '8px',
  },
  userDevices: {
    fontSize: '13px',
    color: theme.primary,
    fontWeight: '500',
  },
});

export default Notifications;