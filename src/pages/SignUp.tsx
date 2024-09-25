import { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registrarUsuario } from '../store/models/SignUpSlices';
import { Link } from 'react-router-dom';
import { CaixaConteudo } from '../style/LoginEstilo';
import Heart from '../assets/Earth.jpg'
import { deepOrange } from '@mui/material/colors';


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    // Função para validar o formato do email
    const validarEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
        return regex.test(email);
    };

    // Função para verificar se a senha é válida
    const validarSenha = (senha: string) => {
        if (senha.length < 5) {
            return false;
        }
        const sequencialRegex = /(.)\1{2,}/;
        if (sequencialRegex.test(senha)) {
            return false;
        }
        return true;
    };

    const handleSignUp = () => {
        if (!validarEmail(email)) {
            setError('Por favor, insira um email válido.');
            return;
        }
        if (!validarSenha(senha)) {
            setError('A senha deve ter pelo menos 5 caracteres e não pode ser sequencial.');
            return;
        }
        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }
        dispatch(registrarUsuario({ email, senha }));
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
        setError(''); // Limpa o erro após um registro bem-sucedido
    };

    return (
        <CaixaConteudo>
            <img src={Heart} width={"700px"} height={"100%"} style={{ marginRight: "20px", marginLeft: "none" }} />
            <Box display="flex" flexDirection="column" alignItems="center" mt={4} width={"850px"}>
                <Avatar
                    sx={{ bgcolor: deepOrange[500], mb: 2 }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"

                >
                    B
                </Avatar>
                <Typography variant="h4" mb={4}>Sign Up</Typography>
                {error && <Typography color="error" mb={2}>{error}</Typography>}
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                    fullWidth
                />
                <TextField
                    label="Senha"
                    variant="outlined"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    sx={{ mb: 2 }}
                    fullWidth
                />
                <TextField
                    label="Confirmar Senha"
                    variant="outlined"
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    sx={{ mb: 2 }}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleSignUp}>
                    Registrar
                </Button>
                <Typography mt={2}>
                    Já possui conta? <Link to="/login">Faça Login</Link>
                </Typography>
            </Box>
        </CaixaConteudo>
    );
}
