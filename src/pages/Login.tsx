import { useState, useEffect } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../store/store';
import { CaixaConteudo } from '../style/LoginEstilo';
import Heart from '../assets/Earth.jpg'
import { deepOrange } from '@mui/material/colors';


export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [isStateLoaded, setIsStateLoaded] = useState(false);

    const navigate = useNavigate();
    const usuarioEmail = useSelector((state: RootState) => state.user.email);
    const usuarioSenha = useSelector((state: RootState) => state.user.senha);

    // Efeito para verificar se o estado persistido foi carregado
    useEffect(() => {
        const unsubscribe = persistor.subscribe(() => {
            if (persistor.getState().bootstrapped) {
                setIsStateLoaded(true);
            }
        });

        // Limpeza para evitar memory leaks
        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogin = () => {
        if (!isStateLoaded) {
            setError('O estado ainda não foi carregado, aguarde...');
            return;
        }

        if (email !== usuarioEmail || senha !== usuarioSenha) {
            setError('Email ou senha inválidos!');
            return;
        }

        navigate('/home');
    };

    // Função para redirecionar para a página de SignUp
    const handleSignUpRedirect = () => {
        navigate('/');
    };

    return (
        <CaixaConteudo>
            <img src={Heart} width={"700px"} height={"100%"} style={{ marginRight: "20px", marginLeft: "none" }} />
            <Box display="flex" flexDirection="column" alignItems="center" mt={4} width={"850px"}>
                <Avatar
                    sx={{ bgcolor: deepOrange[500], mb: 2 }}
                    alt="Remy Sharp"
                    src="/LockOpenSharp"

                >
                    B
                </Avatar>
                <Typography variant="h4" mb={2}>Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
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

                {/* Container para alinhar os botões lado a lado */}
                <Box display="flex" flexDirection="row" justifyContent="center" width="100%" gap={2} mt={2} mb={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        fullWidth
                    >
                        Login
                    </Button>

                    <Button
                        variant="outlined"
                        color='primary'
                        onClick={handleSignUpRedirect}
                        fullWidth
                    >
                        Não tem conta? Cadastre-se
                    </Button>
                </Box>
            </Box>
        </CaixaConteudo >
    );
}
