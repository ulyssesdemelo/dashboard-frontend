import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Enquanto verifica o token, não renderiza nada
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver logado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se estiver logado, renderiza a página normalmente
  return children;
};

export default PrivateRoute;