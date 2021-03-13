import React, { Component } from 'react';
import styles from '../App.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleReyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleReyDown);
  }

  handleReyDown = e => {
    const { onClick } = this.props;
    if (e.code === 'Escape') {
      onClick();
    }
  };

  hadleBackdropClick = e => {
    const { onClick } = this.props;
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  render() {
    const { modalImage, title } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.hadleBackdropClick}>
        <div className={styles.Modal}>
          <img src={modalImage} alt={title} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  modalImage: PropTypes.string,
};
