import React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import Book from './Book'

class Search extends Component {

  render() {
    const {query,updateBook,updateQuery,theState} = this.props
    //const wantToRead = books.filter(book => book.shelf === 'wantToRead')
      return(
        <div>
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event)=>updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <Book
                BOOKSHELF={theState.currentList}
                updateBook={updateBook}
              />
            </div>
          </div>
        </div>
      )
  }
}

export default Search
