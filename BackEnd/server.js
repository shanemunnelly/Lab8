// Import the Express library
const express = require('express')
// Create an Express application
const app = express()
const port = 4000
const cors = require('cors');

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import and parse request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import and connect to MongoDB 
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  // Connect to MongoDB using Mongoose
  await mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14?retryWrites=true&w=majority');
}

// Define a MongoDB schema for the 'my_books' collection
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
})

// Create a Mongoose model for the 'my_books' collection
const bookModel = mongoose.model('my_books', bookSchema);

// Define an endpoint for creating a new book via POST request
app.post('/api/book', (req, res) => {
  console.log(req.body);

  // Create a new book in the database
  bookModel.create({
      title: req.body.title,
      cover: req.body.cover,
      author: req.body.author
    })
    .then(() => {
      res.send("Book Created")
    })
    .catch(() => {
      res.send("Book NOT Created")
    });
})

// Define a default endpoint to test if the server is running
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Define an endpoint to get all books from the database
app.get('/api/books', async (req, res) => {
  // Retrieve all books from the database
  let books = await bookModel.find({});
  res.json(books);
})

// Define an endpoint to get a specific book by its identifier from the database
app.get('/api/book/:identifier', async (req, res) => {
  console.log(req.params.identifier);

  // Find a book by its identifier in the database
  let book = await bookModel.findById(req.params.identifier);
  res.send(book);
})

// Define an endpoint to update a specific book by its identifier via PUT request
app.put('/api/book/:identifier', async (req, res) => {
  console.log("Edit: " + req.params.identifier);

  // Find and update a book by its identifier in the database
  let book = await bookModel.findByIdAndUpdate(req.params.identifier, req.body, { new: true });
  res.send(book);
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
