import React, { useState } from "react";
import Contact from "./Contact";
import photoHelpers from "./contactPhoto";
import "./ContactList.css";

// Google People API omits fields (names, photos, etc.) that a contact lacks,
// so safely read the first entry of an optional array field.
const first = (arr) =>
  Array.isArray(arr) && arr.length > 0 ? arr[0] : undefined;
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

  const allContacts = contactList.length === filteredContactList.length;

  let asyncContacts = () => {
    if (contactList.length === 0) {
      console.log("Awaiting OAuth or contacts to load...");
      return (
        <div className="welcomeDiv">
          <div
            className="prioritactsLogo"
            role="img"
            aria-label="Prioritacts logo"
          ></div>
          <p className="welcomeEyebrow">Hello.</p>
          <h1 className="welcomeH1">Welcome to Prioritacts</h1>
          <h3 className="welcomeH3">
            <div className="">Your</div>
            <div className="animationContacts">contacts</div>
            <div className="animationDots">...</div>
            <div className="animationPrioritized">prioritized</div>
          </h3>
        </div>
      );
    } else {
      return (
        <>
          <div className="searchDiv">
            <svg className="searchIcon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              className="searchInput"
              placeholder="Search contacts"
              aria-label="Search contacts"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm ? (
              <button
                type="button"
                className="clearSearch"
                aria-label="Clear search"
                onClick={() => setSearchTerm("")}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
          <div className="listMeta" aria-live="polite">
            {isSearching
              ? "Searching…"
              : `${allContacts ? `${contactList.length} ` : `${filteredContactList.length}/${contactList.length}`} ${
                  filteredContactList.length === 1 ? "contact" : "contacts"
                }`}
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

  return <div className="inContactList">{asyncContacts()}</div>;
}

export default ContactList;
