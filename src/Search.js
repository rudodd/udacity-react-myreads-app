import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './Books';

function ConfirmationMessage(props) {
	return(
		<div className="confirmation-overlay">
			<div className="confirmation-message">
				<h2>Book added successfully</h2>
				<div className="confirmation-buttons">
					<Link
						to='/'
						className="button confirmation-home"
					>Return to home</Link>
					<button className="button confimartion-close" onClick={()=> {props.toggleConfirmation(false)}}>Continue adding books</button>
				</div>
			</div>
		</div>
	)
}

class Search extends React.Component {

	state = {
		queryTerm: '',
		books: '',
		bookMessage: 'Search for books to add',
		confirmation: false,
	}

	// Set the confimration state to show / hide the confirmation message
	toggleConfirmation = (bool)=> {
		this.setState({
			confirmation: bool,
		});

		// Rerun search to update the current shelf state for books currently returned
		if (bool === false) {
			this.searchBooks(this.state.queryTerm);
		}
	}

	// Query the BooksAPI
	//  - If there are results compare them with the shelf state of existing books
	//  - If there is no results return an error message
	//  - Fallback to a 'Search for books message'
	searchBooks = (query)=> {
		if (query.length) {
			BooksAPI.search(query).then((results)=> {
				if (results.error) {
					this.setState({
						books: '',
						bookMessage: 'No results for the provided search term.',
					});
				} else {
					BooksAPI.getAll().then((books)=>{
						Object.keys(books).forEach((key)=>{
							Object.keys(results).map((resKey)=>{
								if (books[key].id === results[resKey].id) {
									results[resKey].shelf = books[key].shelf
								}
								return true;
							})
						});
						this.setState({
							books: results,
							queryTerm: query,
						});
					})
				}
			});
		} else {
			this.setState({
				books: '',
				bookMessage: 'Search for books to add',
			})
		}
	}

	// Update book shelf state via the BooksAPI and toggle the confirmation message
	addBook = (book, shelf)=> {
		BooksAPI.update(book, shelf).then(()=>{
			this.toggleConfirmation(true);
		});
	}

	render() {
		return (
			<div className="search-books">
				{this.state.confirmation === true && <ConfirmationMessage toggleConfirmation={this.toggleConfirmation} /> }
				<div className="search-books-bar">
					<Link
						to='/'
						className="close-search"
					>Add a book</Link>
					<div className="search-books-input-wrapper">
						<input onChange={(event)=>{this.searchBooks(event.target.value)}} type="text" placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					<Books books={this.state.books} update={this.addBook} emptyMessage={this.state.bookMessage} />
				</div>
			</div>
		)
	}
}

export default Search;