import React from 'react';
import Books from './Book';

class Shelf extends React.Component {

  render() {
    return (
      <div>
        {Object.keys(this.props.shelves).map((key, shelf)=> (
          <div key={key} className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelves[key].header}</h2>
            <div className="bookshelf-books">
              <Books books={this.props.shelves[key].books} />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Shelf;