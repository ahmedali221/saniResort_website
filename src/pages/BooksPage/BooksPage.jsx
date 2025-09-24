import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import api from '../../services/api';

const BooksPage = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'detail'
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ 
    format: '', 
    q: '', 
    page: 1, 
    limit: 20 
  });

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await api.getBooks(filters);
        setBooks(data.items || []);
      } catch (err) {
        setError('Error connecting to server');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filters]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedBook(null);
    setCurrentView('list');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <h2 className="text-5xl font-bold bruce-font" style={{ color: 'var(--yellow-primary)' }}>Loading Books...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <h2 className="text-5xl font-bold text-red-500 bruce-font">{error}</h2>
      </div>
    );
  }

  return (
    <main>
      <HeroSection />
      {currentView === 'list' && (
        <BookList
          books={books}
          onBookSelect={handleBookSelect}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}
      {currentView === 'detail' && selectedBook && (
        <BookDetail
          book={selectedBook}
          onBackToList={handleBackToList}
        />
      )}
    </main>
  );
};

export default BooksPage;




