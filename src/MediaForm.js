import React from 'react';
import firebase from 'firebase';
import './MediaForm.css';
import MediaManager from './MediaManager';

const db = firebase.firestore();

export default class MediaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaEntries: [],
      formControls: {
        title: '',
        author: '',
        type: '',
        notes: ''
      },
      mediaType: ''
    }
  }

  onEntryChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls,
        [name]: value
      }
    });

  }

  addMediaEntry = (event) => {
    // Prevent default form action (will otherwise cause a redirect)
    event.preventDefault();

    db
     .collection('mediaEntries')
     .add({entry: this.state.formControls});

    const formControls = {...this.state.formControls}
    formControls.title = '';
    formControls.author = '';
    formControls.type = '';
    formControls.notes = '';
    this.setState({formControls})

  }

  render() {
    let mediaType = this.props.match.params;
    mediaType = mediaType[Object.keys(mediaType)[0]];
    return (
      <div className='media-manager-box'>
        <MediaManager mediaType={mediaType}/>
        <form className='media-manager-form' onSubmit={this.addMediaEntry}>
          <label className='media-label title'>
            Title
            <input name='title'
              className='media-input'
              value={this.state.formControls.title}
              onChange={this.onEntryChange} />
          </label>
          <label className='media-label author'>
            Author/Creator
            <input name='author'
              className='media-input'
              value={this.state.formControls.author}
              onChange={this.onEntryChange} />
          </label>
          <label className='media-label type'>
            Type
            <select name='type'
              className='media-input'
              value={this.state.formControls.type}
              onChange={this.onEntryChange}>
              <option value="choose-one">--Choose One--</option>
              <option value="books">Books</option>
              <option value="movies">Movies</option>
              <option value="music">Music</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className='media-label notes'>
            Notes
            <input name='notes'
              className='media-input'
              value={this.state.formControls.notes}
              onChange={this.onEntryChange} />
          </label>
          <button className='add-button' type="submit">Add</button>
        </form>

      </div>
    )
  }
}
