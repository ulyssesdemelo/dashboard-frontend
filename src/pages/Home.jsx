import { useState, useEffect } from 'react';
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
      {/* Cards de boas vindas */}
      <div style={styles.welcomeCard}>
        <h2 style={styles.welcomeTitle}>
          Dashboard
        </h2>
        <p style={styles.welcomeText}>
          Gerencie seu sistema de forma fácil e rápida
        </p>
      </div>

      {/* Mostrar erro se houver */}
      {error && (
        <div style={styles.errorCard}>
          {error}
        </div>
      )}

      {/* Cards de estatísticas */}
      <div style={styles.cardsGrid}>
        
        {/* Card de Clientes - DINÂMICO! */}
        <div style={styles.card}>
          <span style={styles.cardIcon}>👥</span>
          <h3 style={styles.cardTitle}>Clientes</h3>
          <p style={styles.cardValue}>
            {loading ? '...' : totalClientes.toLocaleString('pt-BR')}
          </p>
        </div>

        {/* Outros cards ainda fixos */}
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
    margin: '0',
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
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '28px',
    borderRadius: '5px',
    boxShadow: '0 0px 1px rgba(0,0,0,0.20)',
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

export default Home;