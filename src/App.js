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
      if(this.state.query) {
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        newBookArray = this.state.books.filter((currentBook)=>match.test(currentBook.title || currentBook.authors))
        console.log(newBookArray)
      }

        /**the current query does not equal the current book title or author*/

        //currentBook.title.indexOf(query) > -1  || currentBook.authors.indexOf(query) > -1


      // let newArray = this.state.books.concat(booksArray)
      //
      // function removeDuplicates(myArr, prop) {
      //   return myArr.filter((obj, pos, arr) => {
      //     return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
      //   });
      // }
      // console.log(removeDuplicates(newArray,'id'))


      /**
      If there is a book in both the booksArray and the currentList array, then
      update the currentList to reflect the proper shelf stored in the books
      array to the currentList
      */
      if(query) {
        this.setState({currentList: newBookArray})
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
                updateBook={this.updateBook}/>
            </div>

          )}
        />

      </div>
    )
  }
}

export default BooksApp
