import React from 'react';
import Contact from './Contact';


import { Link } from 'react-router-dom';

function ContactList(props){

  return (
    <div className="inContactList">

      {props.contactList.map((contact) =>
        <Contact name={contact.name}
          phone={contact.phone}
          id={contact.id}

          key={contact.id}
          />
      )}



      <style>{`
          .inContactList {
            background: rgb(179,179,179);
            background: linear-gradient(90deg, rgba(179,179,179,0.03) 0%, rgba(179,179,179,0.33) 1%, rgba(179,179,179,0.33) 99%, rgba(179,179,179,0.03) 100%);
          }
          .inContactList h1 {
            margin: 0px;
          }
          `}</style>
      </div>
    );
  }

  export default ContactList;
