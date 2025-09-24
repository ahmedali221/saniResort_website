import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';

const BookDetail = ({ book, onBackToList }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-500 text-white';
      case 'ready':
        return 'bg-yellow-500 text-black';
      case 'draft':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getFormatColor = (format) => {
    switch (format) {
      case 'PDF':
        return 'bg-blue-500 text-white';
      case 'Physical':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleDownloadPdf = async () => {
    if (book.format !== 'PDF' || !book.pdfUrl) {
      setError('PDF not available for this book');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Get the download URL
      const response = await api.getPdfDownloadUrl(book._id);
      
      // Open the PDF in a new tab
      window.open(response.downloadUrl, '_blank');
    } catch (err) {
      setError('Failed to download PDF');
      console.error('Download error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isReadyForPurchase = () => {
    if (book.format === 'PDF') {
      return !!(book.pdfUrl && book.status === 'published');
    }
    if (book.format === 'Physical') {
      return !!(book.inventoryCount > 0 && book.status === 'published');
    }
    return false;
  };

  const isAlreadyPurchased = () => {
    return user?.purchasedBooks?.some(purchasedBook => 
      purchasedBook._id === book._id || purchasedBook === book._id
    );
  };

  const handlePurchase = async () => {
    if (!user) {
      setError('Please log in to purchase books');
      return;
    }

    if (user.coinsRemaining < book.price) {
      setError('Insufficient coins. You need more coins to purchase this book.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Simulate purchase API call
      // In real implementation, this would call the backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Book purchased successfully! You can now access it in your library.');
      setShowPurchaseModal(false);
      
      // In real implementation, update user's purchased books and coins
      // await api.purchaseBook(book._id);
      
    } catch (err) {
      setError('Failed to purchase book. Please try again.');
      console.error('Purchase error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBackToList}
          className="mb-8 flex items-center text-lg font-semibold transition-colors duration-300"
          style={{ color: 'var(--yellow-primary)' }}
        >
          <span className="mr-2">←</span> Back to Books
        </button>

        <div className="bg-white rounded-2xl p-8 mb-8">
          {/* Book Cover */}
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.name}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
              <span className="text-gray-500 text-2xl">No Cover Available</span>
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4 bruce-font" style={{ color: 'var(--bat-black)' }}>
            {book.name}
          </h1>

          {/* Format and Status */}
          <div className="flex gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-base font-bold ${getFormatColor(book.format)}`}>
              {book.format}
            </span>
            <span className={`px-4 py-2 rounded-full text-base font-bold ${getStatusColor(book.status)}`}>
              {book.status}
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
              Price
            </h3>
            <p className="text-3xl font-bold" style={{ color: 'var(--yellow-primary)' }}>
              ${book.price}
            </p>
          </div>

          {/* Inventory (for Physical books) */}
          {book.format === 'Physical' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Inventory
              </h3>
              <p className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>
                {book.inventoryCount || 0} units in stock
              </p>
            </div>
          )}

          {/* Upload Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Upload Date
              </h3>
              <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                {formatDate(book.uploadDate)}
              </p>
            </div>
            
            {book.uploadedBy && (
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                  Uploaded By
                </h3>
                <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                  {book.uploadedBy.name}
                </p>
                <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.6 }}>
                  {book.uploadedBy.email}
                </p>
              </div>
            )}
          </div>

          {/* PDF Download (for PDF books) */}
          {book.format === 'PDF' && book.pdfUrl && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                Download
              </h3>
              <button
                onClick={handleDownloadPdf}
                disabled={loading}
                className="px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
              >
                {loading ? 'Preparing Download...' : 'Download PDF'}
              </button>
              {error && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
            </div>
          )}

          {/* Error and Success Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-100 border border-red-300">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-green-100 border border-green-300">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Purchase Button */}
          <div className="text-center">
            {isAlreadyPurchased() ? (
              <div className="text-center">
                <div className="inline-block px-6 py-3 rounded-xl mb-4" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                  <span className="text-lg font-semibold">✓ Already Purchased</span>
                </div>
                <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                  You own this book and can access it anytime.
                </p>
              </div>
            ) : isReadyForPurchase() ? (
              <div className="space-y-4">
                <button
                  onClick={() => setShowPurchaseModal(true)}
                  className="px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
                >
                  Purchase Book - ${book.price}
                </button>
                {user && (
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    You have {user.coinsRemaining || 0} coins available
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg mb-4" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                  This book is not ready for purchase yet.
                </p>
                <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.5 }}>
                  {book.format === 'PDF' && !book.pdfUrl && 'PDF file not uploaded yet.'}
                  {book.format === 'Physical' && book.inventoryCount === 0 && 'Out of stock.'}
                  {book.status !== 'published' && 'Book not published yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
              Confirm Purchase
            </h3>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    alt={book.name}
                    className="w-16 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h4 className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                    {book.name}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    {book.format} Format
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                <span className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                  Price:
                </span>
                <span className="text-2xl font-bold" style={{ color: 'var(--yellow-primary)' }}>
                  ${book.price}
                </span>
              </div>
              
              {user && (
                <div className="flex justify-between items-center p-4 rounded-xl mt-2" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                  <span className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                    Your Coins:
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    {user.coinsRemaining || 0}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={loading || !user || (user.coinsRemaining < book.price)}
                className="flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
              >
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookDetail;

