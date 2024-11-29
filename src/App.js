import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';


import ProductDetails from './pages/DetailProductPage';
import SeeAllProductPage from './pages/SeeAllProductPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Header />

    

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product-list/:categoryIdFromLink" element={<SeeAllProductPage />} />
        <Route path="product-detail/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
