// This file contains the logic for handling book-related requests.

import Book from '../models/Book.js';

// @desc Get all books
// @route GET /api/books
// @access Public
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get single book by ID
// @route GET /api/books/:id
// @access Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Create a new book
// @route POST /api/books
// @access Private
export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, available } = req.body;

    const newBook = new Book({ title, author, ISBN, available });
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Update a book
// @route PUT /api/books/:id
// @access Private
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Delete a book
// @route DELETE /api/books/:id
// @access Private
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
