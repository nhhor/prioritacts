import React from 'react';

function Contact(props){

  return (
  <div className='contactSection'>
    <div  className='contactRow' id={'contactCell_' + props.id}>
      <p className='contactName'>{props.name}</p>
      <p className='contactPhone'>{props.phone}</p>
      <p className='contactId'>{props.id}</p>
      <style>{`
          .contactSection {
            width: 96%;
            margin-right: 2%;
            margin-left: 2%;
          }

          .contactRow {
            background: rgba(179,179,179,.03);
            text-align: left;
            // width: 100%;
            border-radius: 10px;
            box-shadow: 3px 1px 2px rgba(0, 0, 100, .33);
            padding-left: 20px;
            padding-top: 9px;
            padding-bottom: 9px;
            margin-bottom: 5px;
          }

          .contactRow p {
            margin: 0px;
            // padding: 3px;
          }
          `}</style>
      </div>
    </div>
  );
}

export default Contact;
