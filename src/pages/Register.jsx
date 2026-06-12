import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
  const { register: registerUser } = useAuth();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError('');
      setSuccessMsg('');
      await registerUser(data.name, data.email, data.password);
      setSuccessMsg(`Usuário "${data.name}" criado com sucesso!`);
      reset();
    } catch (error) {
      setServerError(error.response?.data?.error || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar Conta</h2>
        <p style={styles.subtitle}>Preencha os dados abaixo</p>

        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>

          {/* Campo Nome */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome completo</label>
            <input
              style={{
                ...styles.input,
                borderColor: errors.name ? theme.danger : theme.border,
              }}
              type="text"
              placeholder="Seu nome completo"
              {...register('name', {
                required: 'Nome é obrigatório',
                minLength: {
                  value: 3,
                  message: 'Nome deve ter no mínimo 3 caracteres',
                },
              })}
            />
            {errors.name && (
              <span style={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

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
              placeholder="Mínimo 6 caracteres"
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

          {/* Campo Confirmar Senha */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirmar Senha</label>
            <input
              style={{
                ...styles.input,
                borderColor: errors.confirmPassword ? theme.danger : theme.border,
              }}
              type="password"
              placeholder="Repita sua senha"
              {...register('confirmPassword', {
                required: 'Confirmação de senha é obrigatória',
                validate: (value) =>
                  value === password || 'As senhas não coincidem',
              })}
            />
            {errors.confirmPassword && (
              <span style={styles.errorText}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Erro do servidor */}
          {serverError && (
            <div style={styles.serverError}>{serverError}</div>
          )}

          {/* Mensagem de sucesso */}
          {successMsg && (
            <div style={styles.successMsg}>{successMsg}</div>
          )}

          {/* Botão de Cadastro */}
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>

        </form>
      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20px',
    backgroundColor: theme.bg,
  },
  card: {
    backgroundColor: theme.surface,
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: `1px solid ${theme.border}`,
    width: '100%',
    maxWidth: '400px',
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
    fontWeight: '600',
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
  successMsg: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
  },
  button: {
    padding: '13px',
    backgroundColor: theme.primary,
    color: theme.primaryText,
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

export default Register;