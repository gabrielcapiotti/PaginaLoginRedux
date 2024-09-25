import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    email: string;
    senha: string;
}

const initialState: UserState = {
    email: '',
    senha: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registrarUsuario: (state, action: PayloadAction<{ email: string; senha: string }>) => {
            state.email = action.payload.email;
            state.senha = action.payload.senha;
        },
    },
});

export const { registrarUsuario } = userSlice.actions;
export default userSlice.reducer;
