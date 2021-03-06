import React from 'react';

function Authors(props) {
  return (props.book.authors ? props.book.authors.map((author)=>{return <p key={author} className="author">{author}</p>}) : null);
}

function BookGrid(props) {
  return (
    <ol className="books-grid">
      {props.books.map((book)=>(
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 125, height: 190 }}>
                <img src={book.imageLinks ? book.imageLinks.thumbnail : require('./images/no-img.png')} alt={book.title} />
              </div>
              <div className="book-shelf-changer">
                <select value={book.shelf ? book.shelf : 'none'} onChange={(event)=> {props.update(book, event.target.value)}}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors"><Authors book={book} /></div>
          </div>
        </li>
      ))}
    </ol>
  )
}

class Books extends React.Component {

    render() {
    if (this.props.books.length) {
      return (
        <BookGrid books={this.props.books} update={this.props.update} />
      )
    } else {
      return (
        <div className="no-books">
          <h3>{this.props.emptyMessage}</h3>
        </div>
      )
    }
  }
}

export default Books;