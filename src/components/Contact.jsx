import React from "react";
import { connect } from "react-redux";
import { fetchNewVisit } from "./../actions";
import photoHelpers from "./contactPhoto";
import "./Contact.css";

function Contact(props) {
  let birthday = () => {
    const bYear = [props.birthday].map((e) => e.year)[0];
    const bMonth = [props.birthday].map((e) => e.month)[0];
    const bDay = [props.birthday].map((e) => e.day)[0];
    const bString = `${bYear}-${bMonth}-${bDay}`;
    if (bString === "undefined-undefined-undefined") {
      return;
    } else if (bMonth === "undefined") {
      return;
    } else {
      const today = new Date();
      const birthDate = new Date(today.getFullYear(), bMonth - 1, bDay + 1);
      if (today.getMonth() > bMonth + 1 && today.getDate() > bDay)
        birthDate.setFullYear(birthDate.getFullYear() + 1);
      const bResult =
        Math.round(birthDate.getTime() - today.getTime()) / 86400000;
      const finalResult = bResult.toFixed(0);
      const string = `Birthday in ${finalResult} days (on ${bMonth}/${bDay})!`;
      if (finalResult >= 0 && finalResult <= 45) {
        return string;
      } else {
        return;
      }
    }
  };

  let events = () => {
    if (props.events === "" || typeof props.events === undefined) {
      return;
    } else {
      function compare(a, b) {
        const eventA = new Date(a.date.year, a.date.month, a.date.day);
        const eventB = new Date(b.date.year, b.date.month, b.date.day);
        let comparison = 0;
        if (eventA > eventB) {
          comparison = 1;
        } else if (eventA < eventB) {
          comparison = -1;
        }
        return comparison;
      }
      const length = props.events.length;
      const mostRecentEvent = props.events.sort(compare)[length - 1];
      const today = new Date();
      const eventDate = new Date(
        mostRecentEvent.date.year,
        mostRecentEvent.date.month - 1,
        mostRecentEvent.date.day,
      );
      const bResult =
        Math.round(eventDate.getTime() - today.getTime()) / 86400000;
      const finalResult = bResult.toFixed(0) * -1;
      let eventString;
      if (finalResult < 0) {
        eventString = `${mostRecentEvent.formattedType} is in ${finalResult * -1 + 1} days, on ${mostRecentEvent.date.month}/${mostRecentEvent.date.day}!`;
      } else if (finalResult === 0) {
        eventString = `${mostRecentEvent.formattedType} is today!`;
      } else if (finalResult < 365) {
        eventString = `${mostRecentEvent.formattedType} was ${finalResult} days ago.`;
      } else {
        eventString = `${mostRecentEvent.formattedType} was ${(finalResult / 365).toFixed(2)} years ago.`;
      }
      return `${eventString}`;
    }
  };

  let userDefinedLastInteraction = () => {
    if (!Array.isArray(props.userDefined) || props.userDefined.length === 0) {
      return;
    } else {
      const userDefinedFields = props.userDefined.map((x) => {
        if (x.key === "~prioritacts~lastContact~") {
          let iS = x.value.split("-");
          let interactionDate = new Date(iS[0], iS[1] - 1, iS[2]);
          let today = new Date();
          let roundedToday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          );
          let diff = Math.round(
            (roundedToday.getTime() - interactionDate.getTime()) / 86400000,
          );
          if (diff === 0) {
            return `Last interaction (${iS[3]}) was today!`;
          } else if (diff < 365) {
            return `Last interaction (${iS[3]}) was ${diff} days ago.`;
          } else {
            return `Last interaction (${iS[3]}) was ${(diff / 365).toFixed(2)} years ago.`;
          }
        } else {
          return "";
        }
      });
      return userDefinedFields;
    }
  };

  let handleDetailClick = (arg) => {
    let x = document.getElementById(arg);
    if (!x) return;
    x.style.display = x.style.display === "none" ? "" : "none";
  };

  let handleInteractionClick = (
    id,
    etag,
    userDefined,
    interactionType,
    redirect,
    interactionDate,
  ) => {
    // Only "visit" may supply a custom date; all other types always use today.
    let today =
      interactionType === "visit" && interactionDate instanceof Date
        ? interactionDate
        : new Date();
    let userDefinedUpdate = [];
    if (
      userDefined == [] ||
      userDefined == undefined ||
      userDefined == null ||
      userDefined == ""
    ) {
      userDefinedUpdate.push({
        key: "~prioritacts~lastContact~",
        value: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}-${interactionType}`,
      });
    } else {
      userDefined.map(function (e, index) {
        if (e.key === "~prioritacts~lastContact~") {
          return false;
        } else {
          userDefinedUpdate.push(e);
        }
        userDefinedUpdate.push({
          key: "~prioritacts~lastContact~",
          value: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}-${interactionType}`,
        });
        return false;
      });
    }

    const { dispatch } = props;
    dispatch(fetchNewVisit(id, etag, userDefinedUpdate, props.token));
    if (interactionType === "visit") {
      return false;
    } else {
      window.open(redirect, "_blank");
    }
  };

  const visitDateInput = React.useRef(null);

  let handleVisitClick = () => {
    const input = visitDateInput.current;
    if (!input) return;
    input.value = "";
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch (err) {
        // Fall through to focus/click for browsers that refuse showPicker.
      }
    }
    input.focus();
    input.click();
  };

  let handleVisitDateChange = (event) => {
    const value = event.target.value; // "YYYY-MM-DD"
    if (!value) return;
    const [year, month, day] = value.split("-").map(Number);
    handleInteractionClick(
      props.id,
      props.etag,
      props.userDefined,
      "visit",
      "visit",
      new Date(year, month - 1, day),
    );
    event.target.value = "";
  };

  const todayLocal = new Date();
  const todayInputValue = `${todayLocal.getFullYear()}-${String(
    todayLocal.getMonth() + 1,
  ).padStart(2, "0")}-${String(todayLocal.getDate()).padStart(2, "0")}`;

  let _priorityForm = null;
  function handleFormUpdate(event) {
    event.preventDefault();
    let value = _priorityForm.value;
    let id = _priorityForm.id;
    let etag = _priorityForm.attributes.etag.value;
    let userDefined = props.userDefined;
    let userDefinedUpdate = [];
    if (
      userDefined == [] ||
      userDefined == undefined ||
      userDefined == null ||
      userDefined == ""
    ) {
      console.log("No userDefined data found. Creating new userDefined array.");
      userDefinedUpdate.push({
        key: "~prioritacts~frequency~",
        value: `${value}`,
      });
    } else {
      userDefined.map(function (e, index) {
        if (e.key === "~prioritacts~frequency~") {
          return false;
        } else {
          userDefinedUpdate.push(e);
        }
        console.log("Updating userDefined data with new frequency value.");
        userDefinedUpdate.push({
          key: "~prioritacts~frequency~",
          value: `${value}`,
        });
        return false;
      });
    }

    const { dispatch } = props;
    dispatch(fetchNewVisit(id, etag, userDefinedUpdate, props.token));

    handleFormClick("settingsFormID_" + _priorityForm.id);
    _priorityForm.value = null;
  }

  let handleFormClick = (arg) => {
    let x = document.getElementById(arg);
    if (!x) return;
    const isHidden = window.getComputedStyle(x).display === "none";
    x.style.display = isHidden ? "block" : "none";
  };

  const priorityValue = Array.isArray(props.userDefined)
    ? props.userDefined.find((x) => x.key === "~prioritacts~frequency~")
        ?.value
    : undefined;
  const birthdayText = birthday();
  const lastInteractionText = (userDefinedLastInteraction() || [])
    .join("")
    .trim();
  const eventText = events();
  const hasDetails = Boolean(birthdayText || lastInteractionText || eventText);

  return (
    <article
      className="contactSection"
      style={{ animationDelay: `${Math.min(props.index, 12) * 35}ms` }}
    >
      <div className="contactRow" id={"contactCell_" + props.id}>
        <button
          type="button"
          className="contactAvatar"
          aria-label={`Toggle details for ${props.name}`}
          onClick={() => {
            handleDetailClick("gridDiv4_" + props.id);
          }}
        >
          <img
            className="contactPhoto"
            alt=""
            src={props.photo || photoHelpers.getFallbackAvatar(props.name)}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = photoHelpers.getFallbackAvatar(
                props.name,
              );
            }}
          />
        </button>

        <div className="contactInfo">
          <span className="contactName">{props.name || "Unnamed contact"}</span>
          <div className="priorityDiv">
            <button
              type="button"
              className="priorityTrigger"
              aria-label="Edit priority"
              title="Edit priority"
              onClick={() => {
                handleFormClick("settingsFormID_" + props.id);
              }}
            >
              <Icon name="edit" />
              {priorityValue ? (
                <span className="contactUserDefined">
                  Priority <strong>{priorityValue}</strong>
                </span>
              ) : (
                <span className="contactUserDefined isEmpty">Set priority</span>
              )}
            </button>
          </div>
        </div>

        <div className="communicateRow" id={"gridDiv5_" + props.id}>
          <button
            type="button"
            className="actionBtn buttonEMail"
            disabled={!props.email}
            onClick={() => {
              handleInteractionClick(
                props.id,
                props.etag,
                props.userDefined,
                "email",
                `https://mail.google.com/mail/?view=cm&fs=1&to=${props.email}&body=%0A%0A%0A~This message was created with the Prioritacts App!~`,
              );
            }}
          >
            <Icon name="email" />
            <span>Email</span>
          </button>
          <button
            type="button"
            className="actionBtn buttonText"
            disabled={!props.phone}
            onClick={() => {
              handleInteractionClick(
                props.id,
                props.etag,
                props.userDefined,
                "text",
                `sms:${props.phone}`,
              );
            }}
          >
            <Icon name="text" />
            <span>Text</span>
          </button>
          <button
            type="button"
            className="actionBtn buttonPhone"
            disabled={!props.phone}
            onClick={() => {
              handleInteractionClick(
                props.id,
                props.etag,
                props.userDefined,
                "call",
                `tel:${props.phone}`,
              );
            }}
          >
            <Icon name="call" />
            <span>Call</span>
          </button>
          <span className="visitMethod">
            <button
              type="button"
              className="actionBtn buttonVisit"
              onClick={handleVisitClick}
            >
              <Icon name="visit" />
              <span>Visit</span>
            </button>
            <input
              type="date"
              className="visitDateInput"
              aria-label="Visit date"
              tabIndex={-1}
              max={todayInputValue}
              defaultValue=""
              ref={visitDateInput}
              onChange={handleVisitDateChange}
            />
          </span>
        </div>
      </div>

      <div className="settingsForm" id={"settingsFormID_" + props.id}>
        <form onSubmit={handleFormUpdate}>
          <input
            type="number"
            id={props.id}
            etag={props.etag}
            userdefined={props.userDefined}
            name="priorityForm"
            placeholder="Desired frequency"
            aria-label="Desired frequency"
            ref={(input) => {
              _priorityForm = input;
            }}
          />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>

      {hasDetails ? (
        <div className="contactDetails" id={"gridDiv4_" + props.id}>
          {birthdayText ? (
            <p className="contactBirthday">
              <Icon name="cake" />
              {birthdayText}
            </p>
          ) : null}
          {lastInteractionText ? (
            <p className="contactLastInteraction">
              <Icon name="clock" />
              {lastInteractionText}
            </p>
          ) : null}
          {eventText ? (
            <p className="contactEvent">
              <Icon name="calendar" />
              {eventText}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

const ICON_PATHS = {
  edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
  email:
    "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 2-10 7L2 6",
  text: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z",
  call: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  visit:
    "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z",
  cake: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1M2 21h20M7 8v3M12 8v3M17 8v3M7 4h.01M12 4h.01M17 4h.01",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  calendar:
    "M8 2v4M16 2v4M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM3 10h18",
};

function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

export default connect()(Contact);
