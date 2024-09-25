import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../store/models/SignUpSlices';

// Combinação dos reducers
const rootReducer = combineReducers({
    user: userReducer, // Certifique-se de que userReducer está sendo importado corretamente
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Certifique-se de que 'user' está na lista de reducers para persistir
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
