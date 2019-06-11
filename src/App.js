import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import MediaForm from './MediaForm';
import BrowsePage from './BrowsePage'

import Home from './Home';
import './App.css';

const mediaTypes = [
  'Books',
  'Movies',
  'Music',
  'Other'
];

function App() {
  const mediaListLinks = mediaTypes.map((type, idx) => {
    return <div className='media-type-list'>
              <Link key={idx} to={`/media/${type}`}>
                {type.toUpperCase()}
              </Link>
            </div>
  });

  return (
    <div className="app-container">
      <h1 className='media-manager-header'>Media Manager</h1>
      <div className='media-manager-container'>
        <Router>
          <div className='route-links'>
            <Link to="/" className='media-type-list'>HOME</Link>
            {mediaListLinks}
            <Link to="/browse" className='media-type-list'>BROWSE</Link>
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/media/:type" component={MediaForm} />
            <Route exact path="/browse" component={BrowsePage} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
