import React, { useState, createContext } from 'react';

export const FormContext = createContext();

export const FormContextProvider = props => {
  const [values, setValues] = useState({
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    file: '',
  });

  const onchangeHandler = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageHandler = event => {
    const { files } = event.target;
    setValues({ ...values, file: files[0] });
  };

  const imageUploader = async file => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'contactform');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/frozenchicken/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    return await res.json();
  };

  return (
    <FormContext.Provider
      value={{
        values,
        setValues,
        onchangeHandler,
        imageHandler,
        imageUploader,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
