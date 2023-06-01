const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter the book title"]
        },
        image: {
            type: String,
            required: false
        },
        authors: {
            type: String,
            required: true
        },
        genres: {
            type: String,
            required: true
        },
        pageCount: {
            type: Number,
            required: true
        },
        publishedDate: {
            type: Date,
            required: true
        },
        shortDescription: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;