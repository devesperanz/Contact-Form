import React, { useEffect, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { ContactContext } from '../context/context';
import { FormContext } from '../context/formContext';

const EditModal = ({ modal, setModal, toggle, contact }) => {
  const { editUser } = useContext(ContactContext);
  const {
    values,
    setValues,
    onchangeHandler,
    imageHandler,
    imageUploader,
  } = useContext(FormContext);

  useEffect(() => {
    console.log('hola', contact);
    setValues({
      ...values,
      id: contact.id,
      firstName: contact.first_name,
      lastName: contact.last_name,
      email: contact.email,
      avatar: contact.avatar,
    });
  }, [contact]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (values.file !== '') {
      const file = await imageUploader(values.file);
      values.avatar = file.secure_url;
    }

    editUser(contact.id, values);
    setModal(false);

    setValues({
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      file: '',
    });
  };
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className='modal-dialog modal-dialog-centered'
    >
      <ModalHeader toggle={toggle}>
        <h5 className='modal-title' id='exampleModalLabel'>
          Edit Contact
        </h5>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className='card form__card'>
            <div className='row form__row g-4'>
              <div className='col-lg-6 col-md-6'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='First name'
                  aria-label='First name'
                  required
                  name='firstName'
                  value={values.firstName}
                  onChange={onchangeHandler}
                />
              </div>
              <div className='col-lg-6 col-md-6'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Last name'
                  aria-label='Last name'
                  required
                  name='lastName'
                  value={values.lastName}
                  onChange={onchangeHandler}
                />
              </div>
              <div className='col-lg-12'>
                <input
                  type='email'
                  className='form-control'
                  id='inputEmail4'
                  placeholder='Email'
                  required
                  name='email'
                  value={values.email}
                  onChange={onchangeHandler}
                />
              </div>
              <div className='mb-3'>
                <input
                  className='form-control'
                  type='file'
                  id='file'
                  name='file'
                  onChange={imageHandler}
                />
              </div>
              <div className='col-auto'>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </div>
              <div className='col-auto'>
                <Button
                  type='cancel'
                  className='btn btn-warning'
                  onClick={toggle}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditModal;
