// const express = require("express");
// const Books = require("./booksModule");
// const { default: mongoose } = require("mongoose");

// const url = "mongodb://localhost:27017/todo"; // Replace with your MongoDB URL

// const app = express();
// app.use(express.json());

// mongoose.connect(url).then(() => console.log("Connect to  mongoDB"));

// // Define the routes and implement the CRUD operations for the books collection

// app.post("/book", async (req, res) => {
//   try {
//     const { title, author, publicationYear } = req.body;

//     if (!title || !author || !publicationYear) {
//       return res
//         .status(404)
//         .json({ error: "failure", message: "all fields are required" });
//     }
//     let newBook = await Books({ title, author, publicationYear });
//     newBook
//       .save()
//       .then(() =>
//         res
//           .status(200)
//           .json({ error: "success", message: "successsfully book added" })
//       )
//       .catch((err) => res.status(500).json({ error: "failure", message: err }));
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: "server error" });
//   }
// });

// app.get("/books", async (req, res) => {
//   try {
//     let result = await Books.find();
//     return res.status(200).json({ status: "OK", data: result });
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: "server error" });
//   }
// });

// app.get("/book/:id", async (req, res) => {
//   try {
//     let result = await Books.findOne({ _id: req.params.id });
//     return res.status(200).json({ status: "OK", data: result });
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: "server error" });
//   }
// });

// app.delete("/book/:id", async (req, res) => {
//   try {
//     await Books.findOneAndDelete({ _id: req.params.id })
//       .then(() =>
//         res
//           .status(200)
//           .json({ status: "OK", message: "Book deleted successfully" })
//       )
//       .catch((error) =>
//         res.status(500).json({ status: "failed", message: error.message })
//       );
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: error.message });
//   }
// });

// app.put("/book/:id", async (req, res) => {
//   try {
//     await Books.findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(() =>
//         res.status(200).json({ status: "OK", message: "Book has been updated" })
//       )
//       .catch(() =>
//         res.status(500).json({ status: "failed", message: "Unable to update" })
//       );
//   } catch (error) {
//     return res.status(500).json({ status: "failed", message: error.message });
//   }
// });

// const server = app.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let books = [];
let currentId = 1;

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get a book by ID
app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Create a new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  const newBook = {
    id: currentId++,
    title,
    author,
    year,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, year } = req.body;
  const book = books.find((b) => b.id === bookId);
  if (book) {
    book.title = title;
    book.author = author;
    book.year = year;
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
