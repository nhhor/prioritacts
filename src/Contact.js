import React from 'react';

function Contact(props){

  return (
    <div id={'contactDiv' + props.id} className='contactRows'>
        <p className='divGrid1 kegName'>{props.name}</p>
        <p className='divGrid1 kegName'>{props.phone}</p>
        <p className='divGrid1 kegName'>{props.id}</p>
    <style>{`
      .contactRows {
        width: 98%;
        background: rgba(179,179,179,.3);
        border-radius: 10px;
        border: 3px ridge grey;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, .33);
        margin-bottom: 4px;
      }

      .contactRows p {
        margin: 0px;
        padding: 3px;
      }
      `}</style>
      </div>
    );
  }

  export default Contact;
