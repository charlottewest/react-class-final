import React from 'react';
import firebase from 'firebase';
import './MediaForm.css'

const db = firebase.firestore();

export default class MediaManager extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mediaEntries: [],
      mediaType: ''
    }
  }

  componentDidMount() {
    this.unsubscribeManager = db
      .collection('mediaEntries')
      .onSnapshot(snapshot => {
        this.setState({
            mediaEntries: snapshot.docs
        });
    });
  }

  componentWillUnmount() {
    this.unsubscribeManager();
  }

  deleteItem = (item) => {
    db
     .collection('mediaEntries')
     .doc(item.id)
     .delete();
  }

  render() {
    const mediaEntries = this.state.mediaEntries.map(mediaEntry => {
      if (mediaEntry.data().entry.type === this.props.mediaType.toLowerCase()) {
        return (
          <li className='list-item' key={mediaEntry.id}>
            <div className='media-item'>
              <div className='item-title'>{mediaEntry.data().entry.title} by {mediaEntry.data().entry.author}</div>
              <button className='dismiss-button' onClick={() => { this.deleteItem(mediaEntry)} }>
                &times;
              </button>
              <p className='item-notes'>{mediaEntry.data().entry.notes}</p>
            </div>
          </li>
        );
      }
    });

    return (
      <div className='media-manager-entries'>

        <h3 className='media-entries-header'>{this.props.mediaType}</h3>
        <ul>
          {mediaEntries}
        </ul>
      </div>
    )
  }

}
