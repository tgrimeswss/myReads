import React from 'react'
import {Route} from 'react-router-dom'
import Search from './Search'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
            <Search/>
          )}
        />

      <Route exact path="/" render={()=>(
            <div>
              <BookShelf/>
            </div>

          )}
        />

      </div>
    )
  }
}

export default BooksApp
