import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Problem2 = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTermA, setSearchTermA] = useState('');
  const [searchTermB, setSearchTermB] = useState('');
  const [pageA, setPageA] = useState(1);
  const [pageB, setPageB] = useState(1);

  const baseUrl = 'https://contact.mediusware.com/api/contacts/';

  
 
  const fetchContacts = async (isUsContact, page, searchTerm) => {
    const params = { page, searchTerm, country: isUsContact ? 'US' : undefined };

    try {
      const response = await axios.get(baseUrl, { params });
      const contacts = response.data.results;
      console.log(contacts)
      return contacts;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

const loadContacts = async (isUsContact, searchTerm, page) => {
  const contacts = await fetchContacts(page, isUsContact, searchTerm);
  if (isUsContact) {
    setUsContacts((prevContacts) => [...prevContacts, ...contacts]);
  } else {
    setAllContacts((prevContacts) => [...prevContacts, ...contacts]);
  }
};
const handleScroll = (isUsContact) => {
  const scrollY = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollY + clientHeight >= scrollHeight - 100) {
    const page = isUsContact ? pageB : pageA;
    isUsContact ? setPageB(page + 1) : setPageA(page + 1);
  }
};
const handleCheckboxChange = () => {
  setOnlyEven(!onlyEven);
};

const handleContactClick = (contact) => {
  setSelectedContact(contact);
  setModalCOpen(true);
};

useEffect(() => {
  if (modalAOpen) {
    loadContacts(false, searchTermA, pageA);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [modalAOpen, pageA, searchTermA]);

useEffect(() => {
  if (modalBOpen) {
    loadContacts(true, searchTermB, pageB);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [modalBOpen, pageB, searchTermB]);




return (

  <div className="container">
    <div className="row justify-content-center mt-5">
      <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

      <div className="d-flex justify-content-center gap-3">
        <button onClick={() => setModalAOpen(true)} className="btn btn-lg btn-outline-primary" type="button" style={{ backgroundColor: '#46139f' }}>All Contacts</button>
        <button onClick={() => setModalBOpen(true)} className="btn btn-lg btn-outline-warning" type="button"  style={{ backgroundColor: '#ff7f50' }}>US Contacts</button>

        {
          modalAOpen && (

            <div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTermA}
                onChange={(e) => setSearchTermA(e.target.value)}
              />
              {allContacts.map((contact) => (
                <div key={contact.id} onClick={() => handleContactClick(contact)}>
                  {contact.name}
                </div>
              ))}


            </div>
          )}
        {modalBOpen && (
          <div>
          
            <input
              type="text"
              placeholder="Search..."
              value={searchTermB}
              onChange={(e) => setSearchTermB(e.target.value)}
            />
            {usContacts.map((contact) => (
              <div key={contact.id} onClick={() => handleContactClick(contact)}>
                {contact.name}
              </div>
            ))}
          </div>
        )}


        {modalCOpen && (
          <div>
         
            <div>{selectedContact.name}</div>
            <div>{selectedContact.email}</div>
           
          </div>
        )}





       

      </div>

    </div>
  </div>
);

};

export default Problem2;