import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const ClienteForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Validação: pelo menos WhatsApp ou e-mail
    if (!data.whatsapp && !data.email) {
      setServerError('Informe pelo menos WhatsApp ou e-mail.');
      return;
    }

    try {
      setLoading(true);
      setServerError('');
      setSuccessMsg('');

      await api.post('/clientes', data);

      setSuccessMsg(`Cliente "${data.nome} ${data.sobrenome}" cadastrado com sucesso!`);
      reset();
    } catch (error) {
      setServerError(error.response?.data?.error || 'Erro ao cadastrar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Novo Cliente</h1>
        <button
          onClick={() => navigate('/dashboard/clientes')}
          style={styles.backButton}
        >
          ← Voltar para lista
        </button>
      </div>

      <div style={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>

          {/* SEÇÃO: Identificação */}
          <h3 style={styles.sectionTitle}>Identificação</h3>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nome *</label>
              <input
                style={{ ...styles.input, borderColor: errors.nome ? '#e74c3c' : '#ddd' }}
                type="text"
                placeholder="Nome"
                {...register('nome', { required: 'Nome é obrigatório' })}
              />
              {errors.nome && <span style={styles.errorText}>{errors.nome.message}</span>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Sobrenome *</label>
              <input
                style={{ ...styles.input, borderColor: errors.sobrenome ? '#e74c3c' : '#ddd' }}
                type="text"
                placeholder="Sobrenome"
                {...register('sobrenome', { required: 'Sobrenome é obrigatório' })}
              />
              {errors.sobrenome && <span style={styles.errorText}>{errors.sobrenome.message}</span>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>CPF</label>
              <input
                style={styles.input}
                type="text"
                placeholder="000.000.000-00 (opcional)"
                {...register('cpf')}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Data de Nascimento</label>
              <input
                style={styles.input}
                type="date"
                {...register('data_nascimento')}
              />
            </div>
          </div>

          {/* SEÇÃO: Contato */}
          <h3 style={styles.sectionTitle}>Contato</h3>
          <p style={styles.hint}>Informe pelo menos um: WhatsApp ou e-mail</p>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>WhatsApp</label>
              <input
                style={styles.input}
                type="text"
                placeholder="(00) 00000-0000"
                {...register('whatsapp')}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>E-mail</label>
              <input
                style={styles.input}
                type="email"
                placeholder="email@exemplo.com"
                {...register('email')}
              />
            </div>
          </div>

          {/* SEÇÃO: Endereço */}
          <h3 style={styles.sectionTitle}>Endereço</h3>
          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 3 }}>
              <label style={styles.label}>Logradouro</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Rua, avenida..."
                {...register('logradouro')}
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Número</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Nº"
                {...register('numero')}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 2 }}>
              <label style={styles.label}>Cidade</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Cidade"
                {...register('cidade')}
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Estado</label>
              <input
                style={styles.input}
                type="text"
                placeholder="UF"
                maxLength={2}
                {...register('estado')}
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>CEP</label>
              <input
                style={styles.input}
                type="text"
                placeholder="00000-000"
                {...register('cep')}
              />
            </div>
          </div>

          {/* SEÇÃO: Observações */}
          <h3 style={styles.sectionTitle}>Observações</h3>
          <div style={styles.inputGroup}>
            <textarea
              style={styles.textarea}
              rows="4"
              placeholder="Preferências, restrições alimentares, alergias, etc."
              {...register('observacoes')}
            />
          </div>

          {/* Mensagens */}
          {successMsg && <div style={styles.successMsg}>{successMsg}</div>}
          {serverError && <div style={styles.serverError}>{serverError}</div>}

          {/* Botão */}
          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Cadastrar Cliente'}
          </button>

        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  title: { fontSize: '24px', color: '#1a1a2e', margin: 0 },
  backButton: {
    padding: '8px 16px',
    backgroundColor: 'rgb(245, 247, 250)',
    color: 'rgb(26, 26, 46)',
    border: '1.5px solid rgb(26, 26, 46)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#fff',
    padding: '32px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: 'rgb(26, 26, 46)',
    margin: '12px 0 0 0',
    paddingBottom: '8px',
    borderBottom: '1px solid #eee',
  },
  hint: { fontSize: '13px', color: '#888', margin: '0 0 4px 0' },
  row: { display: 'flex', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  label: { fontSize: '13px', fontWeight: '600', color: '#333' },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  errorText: { fontSize: '12px', color: '#e74c3c' },
  successMsg: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
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
    backgroundColor: 'rgb(26, 26, 46)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
};

export default ClienteForm;