import React from 'react';
import Contact from './Contact';
// import { Link } from 'react-router-dom';

function ContactList(props) {

  let asyncContacts = () => {
    if (typeof(props.contactList) == 'undefined') {
      console.log("Awaiting OAuth or contacts to load...")
      return <h1>Hello!</h1>
    } else {
      return props.contactList.map((contact) => <Contact name={contact.names[0].displayName} id={contact.resourceName} key={contact.resourceName}/>)
    }
  };

  return (<div className="inContactList">

    {asyncContacts()}

    <style>
      {
        ` .inContactList {
          // background: rgba(179,179,179,.03);
          // background: linear-gradient(90deg, rgba(179,179,179,0.03) 0%, rgba(179,179,179,0.10) 1%, rgba(179,179,179,0.10) 99%, rgba(179,179,179,0.03) 100%);
        }
        .inContactList h1 {
          margin: 0;
        }
        `
      }</style>
  </div>);
}

export default ContactList;
