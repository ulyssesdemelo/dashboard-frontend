const CapacityCard = () => {
  return (
    <div style={styles.capacityCard}>
      <div style={styles.capacityHeader}>
        <div style={styles.progressCircle}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="#e9ecef"
              strokeWidth="6"
            />
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="6"
              strokeDasharray="157"
              strokeDashoffset="94"
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
            />
            <text
              x="30"
              y="35"
              textAnchor="middle"
              fontSize="14"
              fontWeight="600"
              fill="#4f46e5"
            >
              60%
            </text>
          </svg>
        </div>
      </div>
      <p style={styles.capacityTitle}>Capacidade usada</p>
      <p style={styles.capacityText}>
        Você já está usando 60% da sua capacidade.
      </p>
      <button style={styles.upgradeButton}>Fazer upgrade</button>
    </div>
  );
};

const styles = {
  capacityCard: {
    backgroundColor: '#f8f9ff',
    borderRadius: '12px',
    padding: '20px',
    margin: '16px 12px',
    textAlign: 'center',
  },
  capacityHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  progressCircle: {
    position: 'relative',
  },
  capacityTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: '0 0 6px 0',
  },
  capacityText: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 16px 0',
    lineHeight: '1.5',
  },
  upgradeButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default CapacityCard;