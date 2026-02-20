const Clientes = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👥 Gerenciar Clientes</h1>
      <div style={styles.placeholder}>
        <p style={styles.text}>
          Esta página será desenvolvida em breve! 🚧
        </p>
        <p style={styles.subtext}>
          Aqui você poderá visualizar, adicionar e editar clientes.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: '24px',
  },
  placeholder: {
    backgroundColor: '#fff',
    padding: '60px 40px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  text: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '8px',
  },
  subtext: {
    fontSize: '15px',
    color: '#999',
  },
};

export default Clientes;