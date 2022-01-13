import React from 'react';
import './App.css';
import Shelf from './Shelf';
import Search from './Search';
import { Link, Route, Routes} from 'react-router-dom';

function BookShelf() {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf />
      </div>
      <div className="open-search">
        <Link
          to='/search'
          className="search-button"
        >Add a book</Link>
      </div>
    </div>
  )
}

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/search' element={<Search />} />
          <Route path='/' element={<BookShelf />} />
        </Routes>
      </div>
    )
  }
}

export default App
