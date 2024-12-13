import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductDetails from './pages/DetailProductPage';
import SeeAllProductPage from './pages/SeeAllProductPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { v4 as uuidv4 } from "uuid";
import { CartProvider } from './components/CartContext';

const App = () => {
  const [uuid, setUUID] = useState("");

  useEffect(() => {
    const initializeGuestUUID = () => {
      let storedUUID = localStorage.getItem("guestId");
      if (!storedUUID) {
        storedUUID = uuidv4();
        localStorage.setItem("guestId", storedUUID);
      }
      setUUID(storedUUID);
    };

    initializeGuestUUID();
  }, []);

  return (
    <CartProvider>
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product-list" element={<SeeAllProductPage />} />
          <Route path="product-list/:categoryIdFromLink" element={<SeeAllProductPage />} />
          <Route path="product-detail/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};
export default App;
