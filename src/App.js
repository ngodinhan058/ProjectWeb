import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/DetailProductPage';
import SeeAllProductPage from './pages/SeeAllProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeeAllProductPage />} />
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
    </Router>

  );
}

export default App;
