import React from 'react';

const BookList = ({ books, onBookSelect, filters, onFilterChange }) => {
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

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Our Book Collection
        </h2>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          <input
            type="text"
            placeholder="Search books..."
            value={filters.q}
            onChange={(e) => onFilterChange({ q: e.target.value })}
            className="p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-400 w-64"
            style={{ backgroundColor: 'var(--bat-black)', color: 'var(--text-primary)' }}
          />
          <select
            value={filters.format}
            onChange={(e) => onFilterChange({ format: e.target.value })}
            className="p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-400"
            style={{ backgroundColor: 'var(--bat-black)', color: 'var(--text-primary)' }}
          >
            <option value="">All Formats</option>
            <option value="PDF">PDF</option>
            <option value="Physical">Physical</option>
          </select>
        </div>
        
        {books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl" style={{ color: 'var(--bat-black)' }}>
              No books available with the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => onBookSelect(book)}
              >
                {/* Book Cover */}
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">No Cover</span>
                  </div>
                )}

                {/* Book Title */}
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
                  {book.name}
                </h3>

                {/* Format and Status */}
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getFormatColor(book.format)}`}>
                    {book.format}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(book.status)}`}>
                    {book.status}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    Price
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--yellow-primary)' }}>
                    ${book.price}
                  </p>
                </div>

                {/* Inventory (for Physical books) */}
                {book.format === 'Physical' && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      In Stock
                    </p>
                    <p className="text-lg font-bold" style={{ color: 'var(--bat-black)' }}>
                      {book.inventoryCount || 0} units
                    </p>
                  </div>
                )}

                {/* Upload Date */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    Added
                  </p>
                  <p className="text-sm" style={{ color: 'var(--bat-black)' }}>
                    {formatDate(book.uploadDate)}
                  </p>
                </div>

                {/* Uploaded By */}
                {book.uploadedBy && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Uploaded By
                    </p>
                    <p className="text-sm" style={{ color: 'var(--bat-black)' }}>
                      {book.uploadedBy.name}
                    </p>
                  </div>
                )}

                {/* View Details Button */}
                <button
                  className="w-full px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookSelect(book);
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookList;

