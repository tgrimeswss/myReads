import React,{Component} from 'react'
import './BooksAPI'
import './App.css'

class Book extends Component {

  state = {
    value: ''
  }



  render() {
    return (
      <div>
        <ol className="books-grid">
        {this.props.BOOKSHELF.map((book)=>(
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(event)=>{this.props.updateBook(book,event.target.value)}}>
                    <option>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
        </ol>

      </div>

    )
  }

}

export default Book
