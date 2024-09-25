import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Padrão de armazenamento local
import userReducer from '../store/models/SignUpSlices'; // Ajuste o caminho conforme necessário

// Configuração do persistReducer para persistir o estado do Redux
const persistConfig = {
    key: 'root', // Chave raiz para o armazenamento persistido
    storage,
    whitelist: ['user'], // Lista de reducers que serão persistidos
};

// Combine os reducers, por exemplo, user e outros que você tiver
const rootReducer = combineReducers({
    user: userReducer,
    // Adicione outros reducers aqui, se necessário
});

// Aplica o persistReducer ao rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura a store usando o persistedReducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/FLUSH',
                ],
            },
        }),
});

// Configuração do persistor para gerenciar o estado persistido
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
