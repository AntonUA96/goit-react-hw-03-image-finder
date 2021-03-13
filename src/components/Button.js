import React, { Component } from 'react';
import styles from '../App.module.css';

export default class Button extends Component {
  render() {
    const { loadMore } = this.props;
    return (
      <button type="button" onClick={loadMore} className={styles.Button}>
        Load more
      </button>
    );
  }
}
