import { useState, useEffect } from 'react';
import { Users, TrendingUp, ShoppingCart, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const Home = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [totalClientes, setTotalClientes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/clientes/count');
        setTotalClientes(response.data.total);
        setError('');
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div>
      {/* Cabeçalho */}
      <div style={styles.welcomeCard}>
        <h2 style={styles.welcomeTitle}>Dashboard</h2>
        <p style={styles.welcomeText}>
          Gerencie seu sistema de forma fácil e rápida
        </p>
      </div>

      {/* Mostrar erro se houver */}
      {error && <div style={styles.errorCard}>{error}</div>}

      {/* Cards de estatísticas */}
      <div style={styles.cardsGrid}>

        {/* Card de Clientes - DINÂMICO */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <span style={styles.cardTitle}>Clientes</span>
            <div style={styles.cardIconBox}>
              <Users size={18} color={theme.textMuted} />
            </div>
          </div>
          <p style={styles.cardValue}>
            {loading ? '...' : totalClientes.toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Vendas */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <span style={styles.cardTitle}>Vendas</span>
            <div style={styles.cardIconBox}>
              <TrendingUp size={18} color={theme.textMuted} />
            </div>
          </div>
          <p style={styles.cardValue}>R$ 45.678</p>
        </div>

        {/* Pedidos */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <span style={styles.cardTitle}>Pedidos</span>
            <div style={styles.cardIconBox}>
              <ShoppingCart size={18} color={theme.textMuted} />
            </div>
          </div>
          <p style={styles.cardValue}>567</p>
        </div>

        {/* Avaliações */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <span style={styles.cardTitle}>Avaliações</span>
            <div style={styles.cardIconBox}>
              <Star size={18} color={theme.textMuted} />
            </div>
          </div>
          <p style={styles.cardValue}>4.8</p>
        </div>

      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  welcomeCard: {
    padding: '0 10px 0 4px',
    borderRadius: '12px',
    marginBottom: '32px',
    color: theme.text,
  },
  welcomeTitle: {
    margin: 0,
    fontSize: '24px',
    color: theme.text,
  },
  welcomeText: {
    margin: 0,
    fontSize: '14px',
    color: theme.textMuted,
  },
  errorCard: {
    backgroundColor: '#fdecea',
    color: '#e74c3c',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: theme.surface,
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: `1px solid ${theme.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: '1.2rem',
    color: theme.textMuted,
    fontWeight: '600',
  },
  cardIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: theme.surfaceAlt,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: theme.text,
  },
});

export default Home;