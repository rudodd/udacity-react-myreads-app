import React from 'react';
import * as BooksAPI from './BooksAPI';
import Books from './Books';

class Shelf extends React.Component {

  state = {
    books: '',
    shelves: '',
  }

  // Set the state of book data
  buildBookState = (books)=> {
    this.setState({
      books: books,
      shelves: {
        currentlyReading: {
          header: 'Currently Reading',
          books: books.filter((book)=> {return book.shelf === 'currentlyReading'}),
        },
        wantToRead: {
          header: 'Want to Read',
          books: books.filter((book)=> {return book.shelf === 'wantToRead'}),
        },
        read: {
          header: 'Read',
          books: books.filter((book)=> {return book.shelf === 'read'}),
        },
      }
    });
  }

  // Update the local state for books to avoid making multiple API calls on every shelf update
  updateBookShelf = (books, book, shelf)=> {
    Object.keys(books).map((key)=> {
      if (books[key].id === book.id ) {
        books[key].shelf = shelf;
      }
      return true;
    });
    this.buildBookState(books);
  }

  // Update book shelf state via the BooksAPI
  //  - Method passed down and used by the select input in Book.js
  updateBook = (book, shelf)=> {
    this.updateBookShelf(this.state.books, book, shelf)
    BooksAPI.update(book, shelf);
  }

  // Lifecycle event used to build the book state when the App mounts
  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.buildBookState(books);
    });
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.shelves).map((key)=> (
          <div key={key} className="bookshelf">
            <h2 className="bookshelf-title">{this.state.shelves[key].header}</h2>
            <div className="bookshelf-books">
              <Books books={this.state.shelves[key].books} update={this.updateBook} emptyMessage={'There are no books added to this shelf yet.'} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Shelf;