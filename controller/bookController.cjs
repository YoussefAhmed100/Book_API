const BookModel = require("../models/books.cjs");

exports.getAllBooks = async function (req, res) {
  try {
    const Books = await BookModel.find();
    return res.json({ message: "done", data: Books });
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

exports.getOneBook = async function (req, res) {
  try {
    const Book = await BookModel.find({ _id: req.params.id });
    if (Book.lenght === 0) {
      return res.json({ message: "not found", data: [] });
    } else {
      return res.json({ message: "done", data: Book });
    }
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

exports.addNewBook = async function (req, res) {
  try {
    if (req.user.role === admin) {
      const createdBook = await BookModel.create(req.body);
      return res.json({ message: "Book added sucessfully", data: createdBook });
    } else {
      return res
        .status(404)
        .send({ message: "you don't have the right permission" });
    }
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

exports.deleteBook = async function (req, res) {
  try {
    if (req.user.role === admin) {
      await BookModel.findOneAndDelete(req.params.body);
      return res.json({ message: "book deleted", data: [] });
    } else {
      return res
        .status(403)
        .send({ message: "you don't have the right permission" });
    }
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};

exports.updateBook = async function (req, res) {
  try {
    if (req.user.role === admin) {
      await BookModel.findOneAndUpdate(req.params.id, req.body);
      return res.json({ message: "book Updated", data: [] });
    } else {
      return res
        .status(403)
        .send({ message: "you don't have the right permission" });
    }
  } catch (err) {
    return res.status(404).send({ message: err });
  }
};
// UTILJv5auEPfWFfj
// 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