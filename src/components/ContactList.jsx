import React, { useState } from "react";
import Contact from "./Contact";
import photoHelpers from "./contactPhoto";

// Google People API omits fields (names, photos, etc.) that a contact lacks,
// so safely read the first entry of an optional array field.
const first = (arr) => (Array.isArray(arr) && arr.length > 0 ? arr[0] : undefined);
const getDisplayName = (contact) => first(contact.names)?.displayName || "";

function ContactList(props) {
  const contactList = Array.isArray(props.contactList) ? props.contactList : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  React.useEffect(() => {
    setIsSearching(true);

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 666);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredContactList = contactList.filter((contact) => {
    return getDisplayName(contact)
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
  });

  let asyncContacts = () => {
    if (contactList.length === 0) {
      console.log("Awaiting OAuth or contacts to load...");
      return (
        <div className="welcomeDiv">
          <h1 className="welcomeH1">Hello.</h1>
          <h2 className="welcomeH2">Welcome to Prioritacts!</h2>
          <h3 className="welcomeH3">
            <div className="">Your</div>
            <div className="animationContacts">contacts</div>
            <div className="animationDots">...</div>
            <div className="animationPrioritized">prioritized</div>
          </h3>

          <div className="prioritactsLogo"></div>
        </div>
      );
    } else {
      return (
        <>
          <div className="searchDiv">
            <span className="search">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </span>
            {isSearching ? (
              <span className="searching">Searching...</span>
            ) : null}
          </div>
          {filteredContactList.length === 0 && !isSearching ? (
            <div className="noMatches">No matches found.</div>
          ) : (
            filteredContactList.map((contact, index) => (
              <Contact
                name={getDisplayName(contact)}
                token={props.accessToken}
                id={contact.resourceName}
                etag={contact.etag}
                animationTest={"animationTest" + index}
                birthday={first(contact.birthdays)?.date || ""}
                email={first(contact.emailAddresses)?.value || ""}
                events={contact.events ? contact.events : ""}
                index={index}
                phone={first(contact.phoneNumbers)?.value || ""}
                photo={photoHelpers.getContactPhotoUrl(
                  first(contact.photos)?.url || "",
                  getDisplayName(contact),
                )}
                userDefined={contact.userDefined ? contact.userDefined : []}
                key={contact.resourceName}
              />
            ))
          )}
        </>
      );
    }
  };

  return (
    <div className="inContactList">
      {asyncContacts()}

      <style>
        {`
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

          .noMatches {
            padding: 16px;
            color: #666;
            text-align: center;
            font-size: 0.95rem;
          }

          .searchDiv {
            position: relative;
            padding: 8px;
          }

          .searching {
            padding: 8px 16px;
            color: #666;
            font-size: 0.85rem;
            text-align: center;
            position: absolute;
            left: 0px;
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
          `}
      </style>
    </div>
  );
}

export default ContactList;
