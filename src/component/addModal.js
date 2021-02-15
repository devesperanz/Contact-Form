import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { ContactContext } from '../context/context';
import { FormContext } from '../context/formContext';

function AddModal({ modal, setModal, toggle }) {
  const { addUser } = useContext(ContactContext);
  const {
    values,
    setValues,
    onchangeHandler,
    imageHandler,
    imageUploader,
  } = useContext(FormContext);

  const handleSubmit = async e => {
    e.preventDefault();

    const file = await imageUploader(values.file);
    values.avatar = file.secure_url;
    addUser(values);
    setModal(false);

    setValues({
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      file: '',
    });

    const height = document.getElementById('main').offsetHeight;
    window.scrollTo(0, height);
  };

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className='modal-dialog modal-dialog-centered'
    >
      <ModalHeader toggle={toggle}>
        <h5 className='modal-title' id='exampleModalLabel'>
          Add Contact
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
                  required
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
}

export default AddModal;
