import React from 'react';
import * as BooksAPI from './BooksAPI';
import Books from './Books';

class Shelf extends React.Component {

  state = {
    books: '',
    shelves: '',
  }

  // Helper function to set state of book data from either an API call or an update function
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

  // Update state for books to avoid making an API call to get updated book states
  updateBookShelf = (books, book, shelf)=> {
    Object.keys(books).map((key)=> {
      if (books[key].id === book.id ) {
        books[key].shelf = shelf;
      }
      return true;
    });
    this.buildBookState(books);
  }

  // Update method used by the select input in Book.js
  updateBook = (book, shelf)=> {
    this.updateBookShelf(this.state.books, book, shelf)
    BooksAPI.update(book, shelf);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.buildBookState(books);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {Object.keys(this.state.shelves).map((key)=> (
          <div key={key} className="bookshelf">
            <h2 className="bookshelf-title">{this.state.shelves[key].header}</h2>
            <div className="bookshelf-books">
              <Books books={this.state.shelves[key].books} update={this.updateBook} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Shelf;