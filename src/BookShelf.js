import React,{Component} from 'react'
import './App.css'
import SearchButton from './SearchButton'
import Shelf from './Shelf'

class BookShelf extends Component {

  render() {
    const {books} = this.props
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const read = books.filter(book => book.shelf === 'read')
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <Shelf
          header="Currently Reading"
          shelf="currentlyReading"
          updateBook={this.props.updateBook}
          bookShelf={currentlyReading}
        />

        <Shelf
          header="Want to Read"
          shelf="wantToRead"
          updateBook={this.props.updateBook}
          bookShelf={wantToRead}
        />

        <Shelf
          header="Read"
          shelf="read"
          updateBook={this.props.updateBook}
          bookShelf={read}
        />

      <SearchButton/>
      </div>

    )

  }

}

export default BookShelf
