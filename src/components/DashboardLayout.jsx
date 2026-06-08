import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Dock, FileText, Presentation, Map, VectorSquare, DraftingCompass, Link2, SmartphoneNfc, Bell, UserPlus, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import logo from '../assets/images/headerlogo-nippon-journeys-branco-48x48.png';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Início' },
    { path: '/dashboard/clientes', icon: Users, label: 'Clientes' },
    { path: '/dashboard/clientesX', icon: Dock, label: 'Site' },
    { path: '/dashboard/clientesZ', icon: FileText, label: 'Blog' },
    { path: '/dashboard/clientesP', icon: Presentation, label: 'Landing Page' },
    { path: '/dashboard/notifications', icon: Map, label: 'Roteiros' },
    { path: '/dashboard/notificationsT', icon: VectorSquare, label: 'Grupos' },
    { path: '/dashboard/notificationsH', icon: DraftingCompass, label: 'Travel Design' },
    { path: '/dashboard/notificationsK', icon: Link2, label: 'Links Curtos' },
    { path: '/dashboard/notificationsM', icon: SmartphoneNfc, label: 'Notificações' },
    { path: '/dashboard/usuarios/novo', icon: UserPlus, label: 'Novo Usuário' },
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
          <img src={logo} alt="Nippon Journeys" title="Nippon Journeys" style={styles.headerLogo} />
          <h1 style={styles.logo}>Nippon Journeys</h1>
        </div>
<div style={styles.headerRight}>
          {/* Sininho de notificações (decorativo) */}
          <div style={styles.bellBox}>
            <Bell size={20} color="#1a1a2e" />
            <span style={styles.bellDot} />
          </div>

          {/* Bloco do usuário + dropdown */}
          <div
            style={styles.avatarMenuContainer}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            {/* Avatar */}
            <div style={styles.headerAvatar}>
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  style={styles.headerAvatarImg}
                />
              ) : (
                getInitials(user?.name)
              )}
            </div>

            {/* Nome + cargo */}
            <div style={styles.headerUserInfo}>
              <span style={styles.headerUserName}>{user?.name}</span>
              <span style={styles.headerUserRole}>Admin</span>
            </div>

            {/* Setinha */}
            <ChevronDown size={16} color="#fff" />

          {/* Dropdown */}
          {menuOpen && (
            <div style={styles.dropdown}>
              {/* Cabeçalho do menu: avatar + nome + email */}
              <div style={styles.dropdownHeader}>
                <div style={styles.dropdownAvatar}>
                  {getInitials(user?.name)}
                </div>
                <div style={styles.dropdownUserInfo}>
                  <p style={styles.dropdownName}>{user?.name}</p>
                  <p style={styles.dropdownEmail}>{user?.email}</p>
                </div>
              </div>

              <div style={styles.dropdownDivider} />


              {/* Configurações */}
<Link to="/dashboard/settings" style={styles.dropdownItem}>
                <span style={styles.dropdownItemIcon}>
                  <Settings size={18} />
                </span>
                Configurações
              </Link>

              {/* Ajuda */}
<Link to="/dashboard/help" style={styles.dropdownItem}>
                <span style={styles.dropdownItemIcon}>
                  <HelpCircle size={18} />
                </span>
                Ajuda
              </Link>

              <div style={styles.dropdownDivider} />

              {/* Botão Sair */}
<button onClick={handleLogout} style={styles.dropdownLogout}>
                <span style={styles.dropdownLogoutIcon}>
                  <LogOut size={18} />
                </span>
                Sair
              </button>
            </div>
          )}
        </div>
         </div>
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
                  <span style={styles.menuIcon}>
                    <item.icon size={18} />
                  </span>
                  {!isCollapsed && (
                    <span style={styles.menuLabel}>{item.label}</span>
                  )}
                </Link>
              ))}
            </div>

            {/* Configurações e Help */}
            <div style={styles.bottomMenu}>

                            {/* Botão Recolher menu */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  ...styles.collapseButton,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  paddingLeft: isCollapsed ? '0' : '16px',
                }}
                title={isCollapsed ? 'Expandir menu' : ''}
              >
                <span style={styles.menuIcon}>
                  {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </span>
                {!isCollapsed && <span style={styles.menuLabel}>Recolher menu</span>}
              </button>
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
    headerLogo: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
  avatarMenuContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    paddingBottom: '4px',
    gap: '8px',
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  bellBox: {
    position: 'relative',
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  bellDot: {
    position: 'absolute',
    top: '4px',
    right: '5px',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#e74c3c',
  },
  headerUserInfo: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.2',
  },
  headerUserName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    whiteSpace: 'nowrap',
  },
  headerUserRole: {
    fontSize: '11px',
    color: '#8e9aaf',
  },

  headerAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    border: '2px solid #fff',
  },
    headerAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dropdown: {
    position: 'absolute',
    top: '33px',
    right: 0,
    width: '240px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    padding: '12px',
    zIndex: 200,
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
  },
  dropdownAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '600',
    flexShrink: 0,
  },
  dropdownUserInfo: {
    overflow: 'hidden',
  },
  dropdownName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  dropdownEmail: {
    fontSize: '12px',
    color: '#8e9aaf',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#e9ecef',
    margin: '8px 0',
  },
  dropdownLogout: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 8px',
    backgroundColor: 'transparent',
    color: '#e74c3c',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
  },
  dropdownItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 8px',
    color: '#1a1a2e',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
  },
  dropdownItemIcon: {
    fontSize: '16px',
  },
  dropdownLogoutIcon: {
    fontSize: '16px',
  },
  mainContainer: {
    display: 'flex',
    position: 'relative',
  },
  sidebar: {
    backgroundColor: '#1d2327',
    height: 'calc(100dvh - 30px)',
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
  bottomMenu: {
    borderTop: '1px solid #3b3b3b',
    paddingTop: '16px',
    marginTop: '16px',
  },
  content: {
    flex: 1,
    padding: '1.1rem 1rem 1rem 1.3rem',
    transition: 'margin-left 0.3s ease',
    minHeight: 'calc(100dvh - 72px)',
  },

  collapseButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#c3c4c7',
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  },

};

export default DashboardLayout;