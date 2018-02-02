import React,{Component} from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Shelf extends Component {

  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf).then((newState)=>{
      console.log(newState)
    })
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.header}</h2>
          <div className="bookshelf-books">
            <Book
              BOOKSHELF={this.props.bookShelf}
              updateBook={this.props.updateBook}
              shelf={this.props.shelf}
            />
          </div>
        </div>
      </div>

    )
  }
}

export default Shelf
