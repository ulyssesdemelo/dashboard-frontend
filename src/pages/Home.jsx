import { useState, useEffect } from 'react';
import { Users, TrendingUp, ShoppingCart, Star } from 'lucide-react';
import api from '../services/api';

const Home = () => {
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
              <Users size={18} color="#1a1a2e" />
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
              <TrendingUp size={18} color="#1a1a2e" />
            </div>
          </div>
          <p style={styles.cardValue}>R$ 45.678</p>
        </div>

        {/* Pedidos */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <span style={styles.cardTitle}>Pedidos</span>
            <div style={styles.cardIconBox}>
              <ShoppingCart size={18} color="#1a1a2e" />
            </div>
          </div>
          <p style={styles.cardValue}>567</p>
        </div>

        {/* Avaliações */}
        <div style={styles.card}>
          <div style={styles.cardTop}>
            <span style={styles.cardTitle}>Avaliações</span>
            <div style={styles.cardIconBox}>
              <Star size={18} color="#1a1a2e" />
            </div>
          </div>
          <p style={styles.cardValue}>4.8</p>
        </div>

      </div>
    </div>
  );
};

const styles = {
  welcomeCard: {
    padding: '0 10px 0 4px',
    borderRadius: '12px',
    marginBottom: '32px',
    color: '#1a1a2e',
  },
  welcomeTitle: {
    margin: 0,
    fontSize: '24px',
  },
  welcomeText: {
    margin: 0,
    fontSize: '14px',
    opacity: '0.9',
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
    gap: '14px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
    fontSize: '1.123rem',
    color: '#555',
    fontWeight: '500',
  },
  cardIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a1a2e',
  },
};

export default Home;