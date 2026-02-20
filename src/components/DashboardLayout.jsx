import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

      <div style={styles.mainContainer}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <nav style={styles.nav}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.menuItem,
                  ...(isActive(item.path) ? styles.menuItemActive : {}),
                }}
              >
                <span style={styles.menuIcon}>{item.icon}</span>
                <span style={styles.menuLabel}>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main style={styles.content}>
          {children}
        </main>
      </div>
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
    position: 'sticky',
    top: 0,
    zIndex: 100,
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
  mainContainer: {
    display: 'flex',
    minHeight: 'calc(100vh - 70px)',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    borderRight: '1px solid #e9ecef',
    padding: '24px 0',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 24px',
    color: '#555',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
  },
  menuItemActive: {
    backgroundColor: '#f0f2f5',
    color: '#4f46e5',
    borderLeft: '3px solid #4f46e5',
    fontWeight: '600',
  },
  menuIcon: {
    fontSize: '20px',
  },
  menuLabel: {
    fontSize: '15px',
  },
  content: {
    flex: 1,
    padding: '32px',
    overflow: 'auto',
  },
};

export default DashboardLayout;