import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { meses_minimos_passaporte } from '../config/regras';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const ClienteDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [alterado, setAlterado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('detalhes');

  const formatCVJ = (id) => `CVJ-${String(id).padStart(4, '0')}`;

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/clientes/${id}`);
        const cliente = response.data.cliente;
        if (cliente.data_nascimento) {
          cliente.data_nascimento = cliente.data_nascimento.split('T')[0];
        }
        if (cliente.passaporte_emissao) {
          cliente.passaporte_emissao = cliente.passaporte_emissao.split('T')[0];
        }
        if (cliente.passaporte_vencimento) {
          cliente.passaporte_vencimento = cliente.passaporte_vencimento.split('T')[0];
        }
        if (cliente.visto_vencimento) {
          cliente.visto_vencimento = cliente.visto_vencimento.split('T')[0];
        }
        if (cliente.seguro_vencimento) {
          cliente.seguro_vencimento = cliente.seguro_vencimento.split('T')[0];
        }
        setForm(cliente);
        setError('');
      } catch (err) {
        console.error('Erro ao carregar cliente:', err);
        setError('Erro ao carregar o cliente');
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  const handleChange = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
    setAlterado(true);
    setSuccessMsg('');
  };

  const handleSalvar = async () => {
    if (!form.nome || !form.sobrenome) {
      setError('Nome e sobrenome são obrigatórios');
      return;
    }
    try {
      setSalvando(true);
      setError('');
      await api.put(`/clientes/${id}`, form);
      setSuccessMsg('Alterações salvas com sucesso!');
      setAlterado(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar');
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return <p style={{ padding: '20px', color: theme.text }}>Carregando...</p>;
  }

  if (error && !form) {
    return (
      <div style={{ padding: '20px' }}>
        <p style={{ color: theme.danger }}>{error}</p>
        <button onClick={() => navigate('/dashboard/clientes')} style={styles.backButton}>
          ← Voltar para lista
        </button>
      </div>
    );
  }

  const calcularAlertaPassaporte = (vencimento) => {
    if (!vencimento) return null;

    const hoje = new Date();
    const dataVencimento = new Date(vencimento);

    const dataMinima = new Date();
    dataMinima.setMonth(dataMinima.getMonth() + meses_minimos_passaporte);

    if (dataVencimento < hoje) {
      return {
        tipo: 'vencido',
        mensagem: 'Passaporte VENCIDO. Renovação necessária antes de viajar.',
      };
    }
    if (dataVencimento < dataMinima) {
      return {
        tipo: 'atencao',
        mensagem: `Atenção: passaporte com menos de ${meses_minimos_passaporte} meses de validade. O Japão exige no mínimo ${meses_minimos_passaporte} meses.`,
      };
    }
    return {
      tipo: 'ok',
      mensagem: 'Passaporte com validade adequada para a viagem.',
    };
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/dashboard/clientes')} style={styles.backButton}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <h1 style={styles.title}>
          {formatCVJ(form.id)} · {form.nome} {form.sobrenome}
        </h1>
      </div>

      <div style={styles.card}>
        {/* Abas */}
        <div style={styles.tabs}>
          <span
            style={abaAtiva === 'detalhes' ? styles.tabActive : styles.tab}
            onClick={() => setAbaAtiva('detalhes')}
          >
            Detalhes do cliente
          </span>
          <span
            style={abaAtiva === 'documentos' ? styles.tabActive : styles.tab}
            onClick={() => setAbaAtiva('documentos')}
          >
            Documentos
          </span>
        </div>

        <div style={styles.body}>

          {/* ABA: Detalhes do cliente */}
          {abaAtiva === 'detalhes' && (
            <>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Nome *</label>
                  <input style={styles.input} value={form.nome || ''} onChange={(e) => handleChange('nome', e.target.value)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Sobrenome *</label>
                  <input style={styles.input} value={form.sobrenome || ''} onChange={(e) => handleChange('sobrenome', e.target.value)} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>WhatsApp</label>
                  <input style={styles.input} value={form.whatsapp || ''} onChange={(e) => handleChange('whatsapp', e.target.value)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>E-mail</label>
                  <input style={styles.input} value={form.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>CPF</label>
                  <input style={styles.input} value={form.cpf || ''} onChange={(e) => handleChange('cpf', e.target.value)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Data de Nascimento</label>
                  <input type="date" style={styles.input} value={form.data_nascimento || ''} onChange={(e) => handleChange('data_nascimento', e.target.value)} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={{ ...styles.inputGroup, flex: 3 }}>
                  <label style={styles.label}>Logradouro</label>
                  <input style={styles.input} value={form.logradouro || ''} onChange={(e) => handleChange('logradouro', e.target.value)} />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>Número</label>
                  <input style={styles.input} value={form.numero || ''} onChange={(e) => handleChange('numero', e.target.value)} />
                </div>
              </div>

              <div style={styles.row}>
                <div style={{ ...styles.inputGroup, flex: 2 }}>
                  <label style={styles.label}>Cidade</label>
                  <input style={styles.input} value={form.cidade || ''} onChange={(e) => handleChange('cidade', e.target.value)} />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>Estado</label>
                  <input style={styles.input} maxLength={2} value={form.estado || ''} onChange={(e) => handleChange('estado', e.target.value)} />
                </div>
                <div style={{ ...styles.inputGroup, flex: 1 }}>
                  <label style={styles.label}>CEP</label>
                  <input style={styles.input} value={form.cep || ''} onChange={(e) => handleChange('cep', e.target.value)} />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Observações</label>
                <textarea style={styles.textarea} rows="3" value={form.observacoes || ''} onChange={(e) => handleChange('observacoes', e.target.value)} />
              </div>

              <div style={styles.checkboxRow}>
                <input type="checkbox" id="ativo" checked={form.ativo || false} onChange={(e) => handleChange('ativo', e.target.checked)} />
                <label htmlFor="ativo" style={styles.checkboxLabel}>Cliente ativo</label>
              </div>
            </>
          )}

          {/* ABA: Documentos */}
          {abaAtiva === 'documentos' && (
            <>
              <h3 style={styles.sectionTitle}>Passaporte</h3>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Número do passaporte</label>
                  <input style={styles.input} value={form.passaporte_numero || ''} onChange={(e) => handleChange('passaporte_numero', e.target.value)} />
                </div>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Data de emissão</label>
                  <input type="date" style={styles.input} value={form.passaporte_emissao || ''} onChange={(e) => handleChange('passaporte_emissao', e.target.value)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Data de vencimento</label>
                  <input type="date" style={styles.input} value={form.passaporte_vencimento || ''} onChange={(e) => handleChange('passaporte_vencimento', e.target.value)} />
                </div>
              </div>

              {/* Alerta do passaporte */}
              {(() => {
                const alerta = calcularAlertaPassaporte(form.passaporte_vencimento);
                if (!alerta) return null;
                const estilo =
                  alerta.tipo === 'vencido' ? styles.alertaVencido
                  : alerta.tipo === 'atencao' ? styles.alertaAtencao
                  : styles.alertaOk;
                return <div style={estilo}>{alerta.mensagem}</div>;
              })()}

              <h3 style={styles.sectionTitle}>Documento Nacional</h3>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>RG ou CNH</label>
                  <input style={styles.input} value={form.rg_cnh || ''} onChange={(e) => handleChange('rg_cnh', e.target.value)} />
                </div>
              </div>

              <h3 style={styles.sectionTitle}>Visto</h3>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Tipo de visto</label>
                  <select style={styles.input} value={form.visto_tipo || ''} onChange={(e) => handleChange('visto_tipo', e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="Turismo">Turismo</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Estudo">Estudo</option>
                    <option value="Nômade Digital">Nômade Digital</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Vencimento do visto</label>
                  <input type="date" style={styles.input} value={form.visto_vencimento || ''} onChange={(e) => handleChange('visto_vencimento', e.target.value)} />
                </div>
              </div>

              <h3 style={styles.sectionTitle}>Seguro Viagem</h3>
              <div style={styles.checkboxRow}>
                <input type="checkbox" id="seguro_ativo" checked={form.seguro_ativo || false} onChange={(e) => handleChange('seguro_ativo', e.target.checked)} />
                <label htmlFor="seguro_ativo" style={styles.checkboxLabel}>Possui seguro viagem</label>
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Vencimento do seguro</label>
                  <input type="date" style={styles.input} value={form.seguro_vencimento || ''} onChange={(e) => handleChange('seguro_vencimento', e.target.value)} />
                </div>
              </div>
            </>
          )}

          {/* Mensagens */}
          {successMsg && <div style={styles.successMsg}>{successMsg}</div>}
          {error && <div style={styles.serverError}>{error}</div>}
        </div>

        {/* Rodapé com botão Salvar */}
        <div style={styles.footer}>
          <button
            onClick={handleSalvar}
            disabled={!alterado || salvando}
            style={{
              ...styles.saveButton,
              opacity: alterado && !salvando ? 1 : 0.4,
              cursor: alterado && !salvando ? 'pointer' : 'not-allowed',
            }}
          >
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

const getStyles = (theme) => ({
  container: { maxWidth: '800px' },
  topBar: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  backButton: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '8px 14px', backgroundColor: theme.surface, color: theme.text,
    border: `1.5px solid ${theme.text}`, borderRadius: '8px',
    fontSize: '14px', fontWeight: '500', cursor: 'pointer',
  },
  title: { fontSize: '20px', color: theme.text, margin: 0 },
  card: {
    backgroundColor: theme.surface, borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: `1px solid ${theme.border}`, overflow: 'hidden',
  },
  tabs: { borderBottom: `1px solid ${theme.border}`, padding: '0 24px' },
  tabActive: {
    display: 'inline-block', padding: '16px 4px', marginRight: '24px',
    fontSize: '14px', fontWeight: '600', color: theme.text,
    borderBottom: `2px solid ${theme.primary}`, cursor: 'pointer',
  },
  tab: {
    display: 'inline-block', padding: '16px 4px', marginRight: '24px',
    fontSize: '14px', fontWeight: '600', color: theme.textMuted,
    cursor: 'pointer', borderBottom: '2px solid transparent',
  },
  body: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' },
  row: { display: 'flex', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  label: { fontSize: '13px', fontWeight: '600', color: theme.text },
  sectionTitle: {
    fontSize: '15px', fontWeight: '600', color: theme.text,
    margin: '12px 0 0 0', paddingBottom: '8px', borderBottom: `1px solid ${theme.border}`,
  },
  input: {
    padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${theme.border}`,
    backgroundColor: theme.surface, color: theme.text,
    fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box',
  },
  textarea: {
    padding: '10px 14px', borderRadius: '8px', border: `1.5px solid ${theme.border}`,
    backgroundColor: theme.surface, color: theme.text,
    fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box',
    resize: 'vertical', fontFamily: 'inherit',
  },
  checkboxRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  checkboxLabel: { fontSize: '14px', color: theme.text },
  successMsg: {
    backgroundColor: '#d4edda', color: '#155724',
    padding: '12px', borderRadius: '8px', fontSize: '14px', textAlign: 'center',
  },
  serverError: {
    backgroundColor: '#fdecea', color: '#e74c3c',
    padding: '12px', borderRadius: '8px', fontSize: '14px', textAlign: 'center',
  },
  alertaVencido: {
    backgroundColor: '#fdecea', color: '#c0392b',
    padding: '12px 14px', borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', borderLeft: '4px solid #c0392b',
  },
  alertaAtencao: {
    backgroundColor: '#fff8e1', color: '#b8860b',
    padding: '12px 14px', borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', borderLeft: '4px solid #f0ad4e',
  },
  alertaOk: {
    backgroundColor: '#eafaf1', color: '#1e8449',
    padding: '12px 14px', borderRadius: '8px', fontSize: '13px',
    fontWeight: '500', borderLeft: '4px solid #2ecc71',
  },
  footer: {
    padding: '16px 24px', borderTop: `1px solid ${theme.border}`,
    display: 'flex', justifyContent: 'flex-end',
  },
  saveButton: {
    padding: '11px 28px', backgroundColor: theme.primary, color: theme.primaryText,
    border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600',
  },
});

export default ClienteDetalhe;