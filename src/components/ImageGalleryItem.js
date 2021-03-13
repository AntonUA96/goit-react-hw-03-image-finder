import React, { Component } from 'react';
import styles from '../App.module.css';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    const { hits, onClickGalleryItem } = this.props;
    return hits.map(({ id, webformatURL, largeImageURL, tags }) => (
      <li
        key={id}
        className={styles.ImageGalleryItem}
        onClick={() => onClickGalleryItem(largeImageURL, tags)}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
        />
      </li>
    ));
  }
}

ImageGalleryItem.propTypes = {
  hits: PropTypes.array,
  onClickGalleryItem: PropTypes.func,
};

export default ImageGalleryItem;
