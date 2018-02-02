import React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    query: '',
    currentList: []
  }

  updateQuery=(query) => {
    this.setState({
      query: query
    })

    BooksAPI.search(query).then((booksArray)=>{
      if(query) {
        this.setState({currentList: booksArray})
      }
    })
  }

  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf)
  }

  render() {
    const { query, currentList } = this.state
    if(currentList.error) {
      return(
        <div>
          <div>Nothing found =(</div>
          <Link className="close-search" to="/">Close</Link>
        </div>
      )
    }
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event)=>this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <Book
              BOOKSHELF={currentList}
              updateBook={this.updateBook}
            />
          </div>
        </div>


      </div>
    )
  }
}

export default Search
