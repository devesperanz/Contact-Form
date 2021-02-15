import React, { useState, useEffect, createContext } from 'react';
import axios from '../utils/axiosInstance';

export const ContactContext = createContext();

export const Context = props => {
  const [pageDetails, setPageDetails] = useState({
    page: 1,
    per_page: 1,
    total: 1,
    total_pages: 1,
  });
  const [contacts, setContacts] = useState([]);

  const getData = async (page = 1) => {
    try {
      const info = await axios.get('/users', {
        params: {
          page,
        },
      });
      const res = info.data;
      console.log(res);
      setPageDetails({
        page: res.page,
        per_page: res.per_page,
        total: res.total,
        total_pages: res.total_pages,
      });
      const sorted = [...contacts, ...res.data].sort((a, b) => a.id - b.id);
      setContacts(sorted);
    } catch (e) {
      console.log(e);
    }
  };

  const addUser = async values => {
    try {
      const info = await axios.post('/users', {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        avatar: values.avatar,
      });
      const res = info.data;
      console.log(res);
      setContacts([...contacts, res]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async id => {
    try {
      await axios.delete(`/users/${id}`);
      setContacts(contacts => contacts.filter(data => data.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const editUser = async (id, values) => {
    try {
      const info = await axios.put(`/users/${id}`, {
        id: values.id,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        avatar: values.avatar,
      });
      const res = info.data;
      console.log(res);
      const filteredContacts = contacts.filter(data => data.id !== id);
      const sorted = [...filteredContacts, res].sort((a, b) => a.id - b.id);
      setContacts(sorted);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        pageDetails,
        setContacts,
        deleteUser,
        addUser,
        editUser,
        getData,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
