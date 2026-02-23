import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Início' },
    { path: '/dashboard/clientes', icon: '👥', label: 'Clientes' },
    { path: '/dashboard/notifications', icon: '🔔', label: 'Notificações' },
  ];

  const isActive = (path) => location.pathname === path;

  // Função para pegar iniciais do nome
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={styles.toggleButton}
          >
            {isCollapsed ? '☰' : '✕'}
          </button>
          <h1 style={styles.logo}>Nippon Journeys</h1>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Sair
        </button>
      </header>

      <div style={styles.mainContainer}>
        {/* Sidebar */}
        <aside style={{
          ...styles.sidebar,
          width: isCollapsed ? '50px' : '170px',
        }}>
          <nav style={styles.nav}>
            <div style={styles.menuSection}>
              <p style={{
                ...styles.sectionTitle,
                opacity: isCollapsed ? 0 : 1,
                display: isCollapsed ? 'none' : 'block',
              }}>
                Principal
              </p>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...styles.menuItem,
                    ...(isActive(item.path) ? styles.menuItemActive : {}),
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    paddingLeft: isCollapsed ? '9px' : '16px',
                  }}
                  title={isCollapsed ? item.label : ''}
                >
                  <span style={styles.menuIcon}>{item.icon}</span>
                  {!isCollapsed && (
                    <span style={styles.menuLabel}>{item.label}</span>
                  )}
                </Link>
              ))}
            </div>

            {/* Card de capacidade (quando expandido) */}
            {!isCollapsed && (
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
            )}

            {/* Configurações e Help */}
            <div style={styles.bottomMenu}>
              <Link
                to="/dashboard/settings"
                style={{
                  ...styles.menuItem,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  paddingLeft: isCollapsed ? '0' : '16px',
                }}
                title={isCollapsed ? 'Configurações' : ''}
              >
                <span style={styles.menuIcon}>⚙️</span>
                {!isCollapsed && <span style={styles.menuLabel}>Configurações</span>}
              </Link>

              <Link
                to="/dashboard/help"
                style={{
                  ...styles.menuItem,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  paddingLeft: isCollapsed ? '0' : '16px',
                }}
                title={isCollapsed ? 'Ajuda' : ''}
              >
                <span style={styles.menuIcon}>❓</span>
                {!isCollapsed && <span style={styles.menuLabel}>Ajuda</span>}
              </Link>
            </div>

            {/* User Profile */}
            <div style={{
              ...styles.userProfile,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}>
              <div style={styles.avatar}>
                {getInitials(user?.name)}
              </div>
              {!isCollapsed && (
                <div style={styles.userInfo}>
                  <p style={styles.userName}>{user?.name}</p>
                  <p style={styles.userEmail}>{user?.email}</p>
                </div>
              )}
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main style={{
          ...styles.content,
          marginLeft: isCollapsed ? '50px' : '170px',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#1d2327',
    padding: '1px 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  toggleButton: {
    width: '20px',
    height: '20px',
    border: 'none',
    backgroundColor: '#f5f7fa',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  logo: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '400',
    color: '#fff',
  },
  logoutButton: {
    padding: '8px 8px',
    backgroundColor: '#fff',
    color: '#e74c3c',
    border: '1.5px solid #fff',
    borderRadius: '50%',
    fontSize: '11px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  mainContainer: {
    display: 'flex',
    position: 'relative',
  },
  sidebar: {
    backgroundColor: '#1d2327',
    height: 'calc(100vh - 30px)',
    position: 'fixed',
    left: 0,
    top: '30px',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e9ecef',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0 ',
  },
  menuSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#8e9aaf',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '0 16px',
    marginBottom: '8px',
    transition: 'opacity 0.3s',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#c3c4c7',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    margin: '2px 0px',
    borderRadius: '0px',
  },
  menuItemActive: {
    backgroundColor: '#2271b1',
    color: '#fff',
    fontWeight: '500',
  },
  menuIcon: {
    fontSize: '15px',
    minWidth: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    whiteSpace: 'nowrap',
  },
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
  bottomMenu: {
    borderTop: '1px solid #3b3b3b',
    paddingTop: '16px',
    marginTop: '16px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderTop: '1px solid #3b3b3b',
    marginTop: '16px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    flexShrink: 0,
  },
  userInfo: {
    overflow: 'hidden',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  userEmail: {
    fontSize: '12px',
    color: '#8e9aaf',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    flex: 1,
    padding: '1.1rem 1rem 1rem 1.3rem',
    transition: 'margin-left 0.3s ease',
    minHeight: 'calc(100vh - 72px)',
  },
};

export default DashboardLayout;