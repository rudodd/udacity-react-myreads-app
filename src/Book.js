import React from 'react';

function BookGrid(props) {
  return(
    <ol className="books-grid">
      {props.books.map((book)=>(
        <li key={book.title}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.author}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}

class Books extends React.Component {

  render() {
    console.log(this.props.books);
    if (this.props.books.length) {
    return (
        <BookGrid books={this.props.books} />
      )
    } else {
      return (
        <div>
          <h3>You do not have books on this shelf yet.</h3>
        </div>
      )
    }

  }
}

export default Books;