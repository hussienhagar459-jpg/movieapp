import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import MovieCard from '../components/MovieCard';
import { Heart, Film, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

// استيراد الصورة باسم heart.png
import heartImg from '../assets/heart.png';

export default function Wishlist() {
  // تم إضافة removeFromWishlist هنا
  const { wishlist, removeFromWishlist } = useWishlist(); 
  const [filter, setFilter] = useState('all');

  const filteredItems = wishlist.filter(item => {
    if (filter === 'all') return true;
    return item.media_type === filter;
  });

  const movieCount = wishlist.filter(i => i.media_type !== 'tv').length;
  const tvCount = wishlist.filter(i => i.media_type === 'tv').length;

  return (
    <div className="page-container" style={{ paddingTop: '30px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Watch list</h1>
      </div>

      {wishlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '120px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '24px' }}>
             {/* عرض صورة heart.png */}
             <img 
               src={heartImg} 
               alt="Empty Wishlist Heart" 
               style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
             />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '32px' }}>No Movies in watch list</h2>
          <Link to="/" className="search-btn" style={{ padding: '12px 60px', textDecoration: 'none', display: 'inline-block', borderRadius: '8px' }}>
            Back to home
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
          {wishlist.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden',
              height: '300px'
            }}>
              <img 
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/200x300'} 
                alt={item.title || item.name}
                style={{ width: '200px', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ padding: '24px', flex: 1, position: 'relative' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#000' }}>{item.title || item.name}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '12px' }}>
                  {(item.release_date || item.first_air_date || '').substring(0, 10)}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1,2,3,4].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#000"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>{Math.floor(item.vote_count || 0)}</span>
                </div>
                <p style={{ color: '#333', fontSize: '1rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.overview}
                </p>
                {/* تم إضافة onClick هنا للزر */}
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}