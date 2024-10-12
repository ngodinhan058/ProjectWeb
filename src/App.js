import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';


import ProductDetails from './pages/DetailProductPage';
import SeeAllProductPage from './pages/SeeAllProductPage';

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<SeeAllProductPage />} />
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
