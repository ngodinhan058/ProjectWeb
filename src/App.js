import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { BASE_URL } from './components/api/config';
import ProductDetails from './pages/DetailProductPage';
import SeeAllProductPage from './pages/SeeAllProductPage';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { v4 as uuidv4 } from "uuid";
function App() {
  const [uuid, setUUID] = useState("");

  useEffect(() => {
    const initializeCartAndUUID = async () => {
      try {
        // Check if guestId exists in localStorage
        let storedUUID = localStorage.getItem("guestId");
        if (!storedUUID) {
          // If not, generate a new one
          storedUUID = uuidv4();
          localStorage.setItem("guestId", storedUUID);
          setUUID(storedUUID);
        } else {
          setUUID(storedUUID);
        }
      } catch (error) {
        console.error("Error creating cart:", error.message);
      }
    };

    initializeCartAndUUID();
  }, []);
  return (
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

  );
}

export default App;
