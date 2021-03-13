import React, { Component } from 'react';
import ImageGallery from './components/ImageGallery';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <ImageGallery />
      </div>
    );
  }
}

export default App;
