import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import TvShows from './pages/TvShows';
import TvDetails from './pages/TvDetails';
import SearchResults from './pages/SearchResults';
import AiAssistant from './pages/AiAssistant';
import Wishlist from './pages/Wishlist';
import { WishlistProvider } from './context/WishlistContext';

export default function App() {
  return (
    <WishlistProvider>
      <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/tv" element={<TvShows />} />
                <Route path="/tv/:id" element={<TvDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/ai-assistant" element={<AiAssistant />} />
                <Route path="/watchlist" element={<Wishlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
      </Router>
    </WishlistProvider>
  );
}
