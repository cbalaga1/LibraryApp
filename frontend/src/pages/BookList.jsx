import React, { useEffect, useState } from "react";
import API from "../api"; // Adjust this path based on where you placed api.js

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null);     // State to store any error messages

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        setError(null);   // Clear any previous error messages

        // Make the API call using your configured Axios instance.
        // Assumes your backend endpoint for books is '/books'.
        const res = await API.get("/books");
        setBooks(res.data); // Axios puts the actual response data in the 'data' property

      } catch (err) {
        console.error("Failed to fetch books:", err);
        // Construct a user-friendly error message.
        // Axios errors often have a 'response' object with more details.
        const errorMessage = err.response && err.response.data && err.response.data.message
                             ? err.response.data.message // Use backend's error message if available
                             : err.message; // Fallback to generic Axios error message
        setError(`Failed to load books: ${errorMessage}. Please check your backend connection.`);
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt completes (success or failure)
      }
    };

    fetchBooks(); // Call the async function to fetch books when the component mounts
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Library Book List
        </h2>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center text-lg text-gray-600">
            Loading books...
            {/* Simple spinner animation for visual feedback */}
            <div className="mt-4 animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
            <p className="text-sm mt-2">
              <span className="font-semibold">CORS Tip:</span> If you see a "Network Error" or "Blocked by CORS policy" in your browser's console,
              it strongly indicates that your backend needs to be configured to allow requests from this front-end's origin (e.g., `https://your-frontend.netlify.app`).
              Ensure your backend has CORS middleware properly set up to accept requests from your deployed front-end URL.
            </p>
          </div>
        )}

        {/* Display Books if not loading and no error, and books exist */}
        {!loading && !error && books.length > 0 && (
          <ul className="space-y-4">
            {books.map((book) => (
              <li key={book._id} className="bg-blue-50 p-4 rounded-md shadow-sm border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800">{book.title}</h3>
                {/* Display other book details if they exist in your book object */}
                {book.author && <p className="text-gray-700 text-sm mt-1">Author: {book.author}</p>}
                {book.publicationYear && <p className="text-gray-700 text-sm">Published: {book.publicationYear}</p>}
                {book.description && <p className="text-gray-600 text-sm mt-2">{book.description}</p>}
              </li>
            ))}
          </ul>
        )}

        {/* Message if no books are found after loading */}
        {!loading && !error && books.length === 0 && (
          <div className="text-center text-lg text-gray-600 p-8 border border-dashed border-gray-300 rounded-lg">
            No books found in the library.
            <p className="text-sm mt-2">Try adding some books or verify your API connection and data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
