import React from 'react'
import {Route} from 'react-router-dom'
import Search from './Search'
import BookShelf from './BookShelf'
import './App.css'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {

  state = {
    books:[],
    currentList:[],
    query: ''
  }

  updateBook = (book,shelf) => {
    if(book.shelf!==shelf) {
      BooksAPI.update(book,shelf).then(()=>{
        book.shelf=shelf
        this.setState((state)=>{
          state.books.filter((b)=>b.id!==book.id).concat([book])
        })
      })
    }
  }

  updateQuery=(query) => {
    this.setState({
      query: query
    })



    BooksAPI.search(query).then((booksArray)=>{
      let newBookArray
      let newArray

      if(this.state.query) {
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        newBookArray = this.state.books.filter((currentBook)=>match.test(currentBook.title || currentBook.authors))

        newArray = booksArray.map((bookInSearch)=>{
          newBookArray.forEach((bookOnShelf)=>{
            if(bookInSearch.id===bookOnShelf.id) {
              bookInSearch=bookOnShelf
            }
          })
          return bookInSearch
        })
      }

      if(query) {
        this.setState({currentList: newArray})
      }
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksArray)=>{
      this.setState((state)=>{
        state.books = booksArray
      })
    })
  }

  render() {

    return (
      <div className="app">
        <Route path="/search" render={()=>(
            <Search
              theState={this.state}
              updateQuery={this.updateQuery}
              updateBook={this.updateBook}
            />
          )}
        />

      <Route exact path="/" render={()=>(
            <div>
              <BookShelf
                books={this.state.books}
                updateBook={this.updateBook}
              />
            </div>

          )}
        />

      </div>
    )
  }
}

export default BooksApp
