// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.error("MongoDB Connection Failed:", err);
});

// Book Schema
const Book = mongoose.model('Book', {
    title: String,
    price: String,
    image: String
});

// API to get all books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// API to add a new book
app.post('/books', async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
