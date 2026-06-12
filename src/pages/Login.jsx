import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/images/dashboard-nippon-journeys-viagens-e-turismo-tsuru-branco-492x216.png';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError('');
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Nippon Journeys" style={styles.logo} />
      <div style={styles.card}>
        <h2 style={styles.title}>Entrar</h2>
        <p style={styles.subtitle}>Bem-vindo de volta!</p>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>

          {/* Campo Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={{
                ...styles.input,
                borderColor: errors.email ? theme.danger : theme.border,
              }}
              type="email"
              placeholder="seu@email.com"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email inválido',
                },
              })}
            />
            {errors.email && (
              <span style={styles.errorText}>{errors.email.message}</span>
            )}
          </div>

          {/* Campo Senha */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Senha</label>
            <input
              style={{
                ...styles.input,
                borderColor: errors.password ? theme.danger : theme.border,
              }}
              type="password"
              placeholder="Sua senha"
              {...register('password', {
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter no mínimo 6 caracteres',
                },
              })}
            />
            {errors.password && (
              <span style={styles.errorText}>{errors.password.message}</span>
            )}
          </div>

          {/* Erro do servidor */}
          {serverError && (
            <div style={styles.serverError}>{serverError}</div>
          )}

          {/* Botão de Login */}
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

        </form>
      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
    backgroundColor: theme.bg,
  },
  logo: {
    width: '180px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 30px auto',
  },
  card: {
    backgroundColor: theme.surface,
    padding: '20px 40px',
    border: `1px solid ${theme.border}`,
    borderRadius: '.4rem',
    width: '100%',
    maxWidth: '20rem',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    color: theme.text,
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 32px 0',
    color: theme.textMuted,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    color: theme.text,
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1.5px solid ${theme.border}`,
    backgroundColor: theme.surface,
    color: theme.text,
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  errorText: {
    fontSize: '12px',
    color: theme.danger,
  },
  serverError: {
    backgroundColor: '#fdecea',
    color: '#e74c3c',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
  },
  button: {
    padding: '13px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '24px',
    color: theme.textMuted,
    fontSize: '14px',
  },
  link: {
    color: theme.primary,
    fontWeight: '600',
    textDecoration: 'none',
  },
});

export default Login;