const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://admin:admin17@books.tvfimft.mongodb.net/Books?retryWrites=true&w=majority';

const Book = require('./models/bookModel');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Book Directory');
});

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) {
            return res.status(404).json({ message: `Cannot find any book with ID ${id}` });
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: `Cannot find any book with ID ${id}` });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.set('strictQuery', false);
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Node API app is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
