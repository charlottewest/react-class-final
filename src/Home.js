import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class Home extends React.Component {

  render() {
    return (
      <div className='home-container'>
        <h1 className='home-header'>Home</h1>
        <p>"Welcome to the media manager! To start, select a topic from the list to the right and begin filling out the form. "</p>
      </div>
    )
  }
}
