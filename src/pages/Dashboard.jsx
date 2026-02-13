import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>📊 Dashboard</h1>
        <div style={styles.userInfo}>
          <span style={styles.userName}>Olá, {user?.name}!</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main style={styles.main}>

        {/* Cards de boas vindas */}
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeTitle}>
            Bem-vindo ao Dashboard! 🎉
          </h2>
          <p style={styles.welcomeText}>
            Você está logado como <strong>{user?.email}</strong>
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div style={styles.cardsGrid}>
          <div style={styles.card}>
            <span style={styles.cardIcon}>👥</span>
            <h3 style={styles.cardTitle}>Usuários</h3>
            <p style={styles.cardValue}>1.234</p>
          </div>

          <div style={styles.card}>
            <span style={styles.cardIcon}>📈</span>
            <h3 style={styles.cardTitle}>Vendas</h3>
            <p style={styles.cardValue}>R$ 45.678</p>
          </div>

          <div style={styles.card}>
            <span style={styles.cardIcon}>🛒</span>
            <h3 style={styles.cardTitle}>Pedidos</h3>
            <p style={styles.cardValue}>567</p>
          </div>

          <div style={styles.card}>
            <span style={styles.cardIcon}>⭐</span>
            <h3 style={styles.cardTitle}>Avaliações</h3>
            <p style={styles.cardValue}>4.8</p>
          </div>
        </div>

      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  logo: {
    margin: 0,
    fontSize: '22px',
    color: '#1a1a2e',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userName: {
    fontSize: '15px',
    color: '#555',
    fontWeight: '500',
  },
  logoutButton: {
    padding: '8px 18px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  main: {
    padding: '32px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  welcomeCard: {
    backgroundColor: '#4f46e5',
    padding: '32px',
    borderRadius: '12px',
    marginBottom: '32px',
    color: '#fff',
  },
  welcomeTitle: {
    margin: '0 0 8px 0',
    fontSize: '24px',
  },
  welcomeText: {
    margin: 0,
    fontSize: '16px',
    opacity: 0.9,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  cardIcon: {
    fontSize: '36px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '15px',
    color: '#888',
    fontWeight: '500',
  },
  cardValue: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
  },
};

export default Dashboard;