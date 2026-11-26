import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Rooms from './pages/Rooms.jsx';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="habitaciones" element={<Rooms />} />
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
    );
}
