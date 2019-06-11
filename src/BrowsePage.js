import React from 'react';
import firebase from 'firebase';
import './MediaForm.css'

const db = firebase.firestore();

class BrowsePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      hasError: false,
      mediaEntries: []
    }
  }

  componentDidMount() {
    const API_KEY = 'cL4ZSoAszQtgwH2w6VOos2DAWI3H6aTN';
    const BASE_URL = 'https://api.nytimes.com/svc/books/v3/lists';
    const url = `${BASE_URL}/current/hardcover-fiction.json?api-key=${API_KEY}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data.results,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          hasError: true,
          isLoading: false
        });
      });
  }

  addBook = (selectedBook) => {
    const newBook = {
      title: selectedBook.title,
      author: selectedBook.author,
      type: 'books',
      notes: ''
    }

    db
     .collection('mediaEntries')
     .add({entry: newBook});
  }


  render() {
    console.log(process.env.NYT_KEY)
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    if (this.state.hasError) {
      return <div>ERROR, please reload and try again</div>;
    }

    const topNYTBooks = this.state.data.books.map((book, idx) => {
      return  <div className='book-entry' key={idx}>
                <a href={book.amazon_product_url}>
                <div className='book-title'>{book.title}</div>
                <p className='book-author'>{book.author}</p>
                <img src={book.book_image} className='book-image' alt={book.title}/>
                </a>
                <button className='add-button' onClick={() => {this.addBook(book)}}>Add</button>
              </div>
    })
    return (
      <div>
        <h2>Browse books from the New York Times bestsellers list...</h2>
        <div className='book-list'>{topNYTBooks}</div>
      </div>
      );

  }
}

export default BrowsePage;
