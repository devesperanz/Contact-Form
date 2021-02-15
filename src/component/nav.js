import React, { useState } from 'react';
import AddModal from './addModal';

const Nav = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container'>
        <h1 className='navbar__logo'>contact list</h1>
        <button
          className='btn navbar-btn navbar-link'
          type='submit'
          onClick={toggle}
        >
          New Contact
        </button>
        <AddModal modal={modal} setModal={setModal} toggle={toggle} />
      </div>
    </nav>
  );
};

export default Nav;
