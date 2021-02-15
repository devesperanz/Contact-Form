import React, { useState } from 'react';
import EditModal from './editModal';

const ContactCard = ({ contact, deleteUser }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className='card card-content col-lg-4 col-md-6 mb-5'>
      <img
        src={contact.avatar}
        key={contact.avatar}
        className='card__img card-img-top mt-3'
        alt={contact.first_name}
      />
      <div className='card-body'>
        <h3 className='card-title'>
          {contact.first_name} {contact.last_name}
        </h3>
        <p>{contact.email}</p>
        <button
          type='button'
          className='btn btn-primary  card__button'
          onClick={toggle}
        >
          <i className='fa fa-edit'></i>
        </button>
        <button
          className='btn btn-danger'
          onClick={() => deleteUser(contact.id)}
        >
          <i className='fa fa-trash'></i>
        </button>
        {modal && (
          <EditModal
            modal={modal}
            setModal={setModal}
            toggle={toggle}
            contact={contact}
          />
        )}
      </div>
    </div>
  );
};

export default ContactCard;
