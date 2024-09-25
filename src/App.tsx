import { Provider } from "react-redux"
import AppRoutes from "./routes/AppRoutes"
import { store } from "./store"
import { persistor } from "./store/store"
import { PersistGate } from "redux-persist/integration/react"
import './App.css';

function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
