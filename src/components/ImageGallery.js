import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../App.module.css';
import imagesApi from '../services/image-api';
import Searchbar from './Searchbar';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from './Modal';
import Button from './Button';
import Loader from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    error: null,
    showModal: false,
    modalImage: '',
    title: '',
    loading: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchHits = () => {
    const { currentPage, searchQuery } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };
    this.setState(prevState => ({ loading: true }));
    imagesApi
      .fetchHits(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  onClickGalleryItem = (src, alt) => {
    this.toggleModal();
    this.setState({ modalImage: src, title: alt });
  };

  render() {
    const { hits, error, showModal, modalImage, title, loading } = this.state;
    return (
      <>
        {error && <h1>Error</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        {showModal && (
          <Modal
            onClick={this.onClickGalleryItem}
            modalImage={modalImage}
            title={title}
          />
        )}
        <ul className={styles.ImageGallery}>
          {hits && (
            <ImageGalleryItem
              hits={hits}
              onClickGalleryItem={this.onClickGalleryItem}
            />
          )}
        </ul>
        {loading && (
          <Loader
            className={styles.Loader}
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {hits.length > 0 && <Button loadMore={this.fetchHits} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  error: PropTypes.string,
  showModal: PropTypes.func,
  modalImage: PropTypes.bool,
  title: PropTypes.string,
  loading: PropTypes.bool,
  hits: PropTypes.array,
};

export default ImageGallery;
