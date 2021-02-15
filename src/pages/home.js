import React, { useContext } from 'react';
import { ContactContext } from '../context/context';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContactCard from '../component/contactCard';

const Home = () => {
  const { contacts, pageDetails, getData, deleteUser, editUser } = useContext(
    ContactContext
  );

  const getNextPost = async currentPage => {
    await getData(currentPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={pageDetails.total_pages}
      next={() => getNextPost(pageDetails.page)}
      hasMore={pageDetails.page < pageDetails.total_pages}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div id='main' className='container-fluid row card__main'>
        {contacts &&
          Array.isArray(contacts) &&
          contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              editUser={editUser}
              deleteUser={deleteUser}
            />
          ))}
      </div>
    </InfiniteScroll>
  );
};

export default Home;
