import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AppTestView = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example"
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => {
          subtitle = _subtitle;
          return subtitle;
        }}
        >
          Hello
        </h2>
        <button type="button" onClick={closeModal}>close</button>
        <div>i am a modal</div>
        <form>
          <input />
          <button type="button">sample</button>
        </form>
      </Modal>
    </div>
  );
};

export default AppTestView;
