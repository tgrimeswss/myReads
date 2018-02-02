import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchButton from './SearchButton'
import Shelf from './Shelf'

class BookShelf extends Component {

  state = {
    currentlyReading:[],
    wantToRead: [],
    read: []
  }

  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf).then((newState)=>{
      this.setState({newState})
      //^ state is now set to the new state after the update
    })

    //Updating the local state below. I was banging my head against the wall,
    //trying to find a simpler way. If you see this, let me know if there is one
    this.setState((state)=>{
      state.currentlyReading=state.currentlyReading.filter((currentBook)=>currentBook!==book)
      state.wantToRead=state.wantToRead.filter((currentBook)=>currentBook!==book)
      state.read=state.read.filter((currentBook)=>currentBook!==book)
      if(shelf==='currentlyReading') {
        state.currentlyReading.push(book)
      } else if(shelf==='wantToRead') {
        state.wantToRead.push(book)
      } else if(shelf==='read') {
        state.read.push(book)
      }
    })
  }

  //Component mounts and updates the books to the proper places
  componentDidMount() {
    BooksAPI.getAll().then((booksArray)=>{
      this.setState((state)=>{
        state.currentlyReading=booksArray.filter((book)=>book.shelf==='currentlyReading')
        state.wantToRead=booksArray.filter((book)=>book.shelf==='wantToRead')
        state.read=booksArray.filter((book)=>book.shelf==='read')
      })
    })
  }


  render() {
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        
        <Shelf
          header="Currently Reading"
          shelf="currentlyReading"
          updateBook={this.updateBook}
          bookShelf={this.state.currentlyReading}
        />

        <Shelf
          header="Want to Read"
          shelf="wantToRead"
          updateBook={this.updateBook}
          bookShelf={this.state.wantToRead}
        />

        <Shelf
          header="Read"
          shelf="read"
          updateBook={this.updateBook}
          bookShelf={this.state.read}
        />

        <SearchButton/>
      </div>

    )

  }

}

export default BookShelf
