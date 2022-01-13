import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './Books';

class Search extends React.Component {

	state = {
		books: '',
	}

	searchBooks = (query)=> {
		if (query.length) {
			BooksAPI.search(query).then((results)=> {
				console.log(results);
				this.setState({
					books: results,
				});
			});
		} else {
			this.setState({
				books: '',
			})
		}
	}

	addBook = (book, shelf)=> {
		BooksAPI.update(book, shelf);
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to='/'
						className="close-search"
					>Add a book</Link>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
	
							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input onChange={(event)=>{this.searchBooks(event.target.value)}} type="text" placeholder="Search by title or author"/>
	
					</div>
				</div>
				<div className="search-books-results">
					<Books books={this.state.books} update={this.addBook} emptyMessage={'Search for books to add.'} />
				</div>
			</div>
		)
	}
}

export default Search;