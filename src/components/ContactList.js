import React from 'react';
import Contact from './Contact';
// import { Link } from 'react-router-dom';

function ContactList(props) {

  let asyncContacts = () => {
    if (typeof(props.contactList) == 'undefined') {
      console.log("Awaiting OAuth or contacts to load...")
      return (
        <div className="welcomeDiv">
          <h1 className="welcomeH1">Hello.</h1>
          <h2 className="welcomeH2">Welcome to Prioritacts!</h2>
          <h3 className="welcomeH3">
            <div className="">Your</div>
            <div className='animationContacts'>contacts</div>
            <div className='animationDots'>...</div>
            <div className='animationPrioritized'>prioritized</div>
          </h3>

          <div className='prioritactsLogo'>

          </div>


        </div>
      )
    } else {
      return props.contactList.map((contact, index) => <Contact
      name={(contact.names[0].displayName ? contact.names[0].displayName : '')}
      token={props.accessToken}
      id={contact.resourceName}
      etag={contact.etag}
      animationTest={'animationTest'+index}
      birthday={(contact.birthdays ? contact.birthdays[0].date : '')}
      email={(contact.emailAddresses ? contact.emailAddresses[0].value : '')}
      events={(contact.events ? contact.events : '')}
      index={index}
      phone={(contact.phoneNumbers ? contact.phoneNumbers[0].value : '')}
      photo={(contact.photos ? (contact.photos[0].url+'?access_token='+props.accessToken) : '')}
      userDefined={(contact.userDefined ? contact.userDefined : [])}
      key={contact.resourceName}/>)
    }
  };

  return (
    <div className="inContactList">
      {asyncContacts()}


      <style>
        {
          `
          .welcomeDiv {
            height: 100%;
            padding-top: 50px;
            overflow: hidden;
          }

          .welcomeH1 {
            padding-top: 50px;
            margin: 0px;
          }

          .welcomeH2 {
            padding-top: 50px;
            margin: 0px;
          }

          .welcomeH3 {
            padding-top: 50px;
            margin: 0px;
          }


          .prioritactsLogo {
            margin-top: 50px;

            position: absolute;
            left: 50%;
            transform: translate(-50%, -0%);

            background: url("PrioritactsSample_ByTailorBrands.png");
            background-size: contain;
            width: 128px;
            height: 128px;
          }


          .inContactList {
            // background: rgba(179,179,179,.03);
            // background: linear-gradient(90deg, rgba(179,179,179,0.03) 0%, rgba(179,179,179,0.10) 1%, rgba(179,179,179,0.10) 99%, rgba(179,179,179,0.03) 100%);
          }

          .inContactList h1 {
            margin: 0;
          }

          .animationContacts {
            animation: animationContactsEffect 4s infinite;
          }
          .animationPrioritized {
            animation: animationPrioritizedEffect 4s infinite;
          }
          .animationDots {
            animation: animationDotsEffect .5s infinite;
          }

          @keyframes animationContactsEffect {
            0%   { transform: translate(-75px, 0vh);}
            25%  { transform: translate(75px, 0vh);}
            50%  { transform: translate(75px, 50px);}
            75%  { transform: translate(-75px, 50px);}
            100% { transform: translate(-75px, 0vh);}
          }
          @keyframes animationPrioritizedEffect {
            0%   { transform: translate(75px, 0vh);}
            25%  { transform: translate(-75px, 0vh);}
            50%  { transform: translate(-75px, -50px);}
            75%  { transform: translate(75px, -50px);}
            100% { transform: translate(75px, 0vh);}
          }
          @keyframes animationDotsEffect {
            0%  { transform: rotate(0turn);}
            100%  { transform: rotate(1turn);}
          }
          `
        }
      </style>
    </div>);
  }

  export default ContactList;
