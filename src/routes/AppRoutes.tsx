import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);

export default AppRoutes;
