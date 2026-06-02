import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Notifications from './pages/Notifications';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota padrão redireciona para login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas com DashboardLayout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Home />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/usuarios/novo"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Register />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/clientes"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Clientes />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/notifications"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

/*
**O que mudou?**
- ✅ Importamos os novos componentes (Home, Clientes, Notifications, DashboardLayout)
- ✅ Envolvemos as páginas do dashboard com `<DashboardLayout>`
- ✅ Criamos 3 rotas: `/dashboard`, `/dashboard/clientes`, `/dashboard/notifications`

---

## 🧪 TESTAR AGORA!

Salve tudo e acesse:

http://localhost:3000
*/