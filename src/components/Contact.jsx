import React from "react";
import { connect } from "react-redux";
import { fetchNewVisit } from "./../actions";

function Contact(props) {
  let animationTestNumberP = Math.floor(Math.random() * 101) + 75;
  let animationTestNumberN = Math.floor(Math.random() * 101) - 125;

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

  let userDefinedPriority = () => {
    if (
      props.userDefined === "" ||
      typeof props.userDefined === undefined ||
      props.userDefined === []
    ) {
      return;
    } else {
      const userDefinedFields = props.userDefined.map((x) => {
        if (x.key === "~prioritacts~frequency~") {
          return ` Priority set to ${x.value}`;
        } else {
          return "";
        }
      });
      return userDefinedFields;
    }
  };

  let userDefinedLastInteraction = () => {
    if (
      props.userDefined === "" ||
      typeof props.userDefined === undefined ||
      props.userDefined === []
    ) {
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
    x.style.display = x.style.display === "none" ? "block" : "none";
  };

  let handleInteractionClick = (
    id,
    etag,
    userDefined,
    interactionType,
    redirect,
  ) => {
    let today = new Date();
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
    x.style.display = x.style.display === "none" ? "block" : "none";
  };

  return (
    <div className={"contactSection " + props.animationTest}>
      <div className="contactRow" id={"contactCell_" + props.id}>
        <div className="gridParent">
          <div
            className="gridDiv1"
            onClick={() => {
              handleDetailClick("gridDiv4_" + props.id);
            }}
          >
            <img
              className="contactPhoto"
              alt={`(p${props.index})`}
              src={
                props.photo ||
                "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect width="50" height="50" rx="25" fill="#d9d9d9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">?</text></svg>',
                  )
              }
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><rect width="50" height="50" rx="25" fill="#d9d9d9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="#666">?</text></svg>',
                  );
              }}
            />
          </div>

          <div className="gridDiv2">
            <span className="contactName">{props.name}</span>
          </div>

          <div className="gridDiv3">
            <div className="priorityDiv">
              <span
                className="priorityTrigger"
                onClick={() => {
                  handleFormClick("settingsFormID_" + props.id);
                }}
              >{`✏️`}</span>
              <span className="contactUserDefined">
                {userDefinedPriority()}
              </span>
              <div className="settingsForm" id={"settingsFormID_" + props.id}>
                <form onSubmit={handleFormUpdate}>
                  <input
                    type="number"
                    id={props.id}
                    etag={props.etag}
                    userdefined={props.userDefined}
                    name="priorityForm"
                    placeholder="Desired Frequency"
                    ref={(input) => {
                      _priorityForm = input;
                    }}
                  />
                  <button type="submit">Update</button>
                </form>
              </div>
            </div>
          </div>
          <div className="gridDiv5" id={"gridDiv5_" + props.id}>
            <div className="communicateRow">
              <span className="contactMethod">
                <button
                  className="buttonEMail"
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
                  Email
                </button>
              </span>
              <span className="contactMethod">
                <button
                  className="buttonText"
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
                  Text
                </button>
              </span>
              <span className="contactMethod">
                <button
                  className="buttonPhone"
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
                  Call
                </button>
              </span>
              <span className="contactMethod">
                <button
                  className="buttonVisit"
                  onClick={() => {
                    handleInteractionClick(
                      props.id,
                      props.etag,
                      props.userDefined,
                      "visit",
                      "visit",
                    );
                  }}
                >
                  Visit
                </button>
              </span>
            </div>
          </div>
          <div className="gridDiv4" id={"gridDiv4_" + props.id}>
            <p className="contactBirthday">{birthday()}</p>
            <p className="contactLastInteraction">
              {userDefinedLastInteraction()}
            </p>
            <p className="contactEvent">{events()}</p>
          </div>
        </div>
      </div>
      <style>{`

          .gridParent {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: 1fr repeat(2, .5fr);
            grid-column-gap: 3px;
            grid-row-gap: 3px;
          }

          .gridDiv1 { grid-area: 1 / 1 / 2 / 2; justify-content: left; align-items: center; display: flex;}
          .gridDiv2 { grid-area: 1 / 2 / 2 / 8; justify-content: left; align-items: center; display: flex;}
          .gridDiv3 { grid-area: 2 / 1 / 3 / 8; justify-content: left; align-items: center; display: flex;}
          .gridDiv4 { grid-area: 3 / 1 / 4 / 8;}
          .gridDiv5 { grid-area: 1 / 8 / 4 / 10; justify-content: center; align-items: center; display: flex;}

          .contactSection {
            width: 96%;
            margin-right: 2%;
            margin-left: 2%;
          }

          .contactRow {
            background: rgba(179,179,179,.03);
            text-align: left;
            border-radius: 10px;
            box-shadow: 3px 1px 2px rgba(0, 0, 100, .33);
            padding-left: 5%;
            padding-top: 9px;
            padding-bottom: 6px;
          }

          .contactRow p {
            margin: 0px;
          }

          .contactPhoto {
            width: 50px;
            height: 50px;
            border-radius: 50px;
            border: 1px solid grey;
          }

          .communicateRow {
            height: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
            align-content: space-around;

          }

          .contactMethod {
            padding: 1px;
          }

          .buttonEMail {
            background-color: rgba(255,0,0,.1);
            border-radius: 25px;
            font-weight: bolder;
            min-width: 50px;
          }

          .buttonText {
            background-color: rgba(255,255,0,.1);
            border-radius: 25px;
            font-weight: bolder;
            min-width: 50px;
          }

          .buttonPhone {
            background-color: rgba(0,255,0,.1);
            border-radius: 25px;
            font-weight: bolder;
            min-width: 50px;
          }

          .buttonVisit {
            background-color: rgba(0,0,255,.1);
            border-radius: 25px;
            font-weight: bolder;
            min-width: 50px;
          }

          .priorityDiv {
            margin-left: 15%;
          }
          .priorityTrigger {
            background-color: rgba(0,0,255,.05);
            border-radius: 25px;
            padding: 5px 5px 5px 3px;
            cursor: pointer;
          }
          .settingsForm {
            position: absolute;
            left: 6%;
            display: none;
          }
          .contactUserDefined{
            font-style: italic;
            font-size: 0.75em;
          }
          .contactBirthday{
            font-weight: bolder;
          }
          .contactEvent{
            font-size: 0.75em;
          }
          .contactLastInteraction{
            font-size: 0.75em;
          }

          .animationTest0 {
            animation: div_animation_effect0 0.25s 1;
          }
          .animationTest1 {
            animation: div_animation_effect1 0.5s 1;
          }
          .animationTest2 {
            animation: div_animation_effect2 0.75s 1;
          }
          .animationTest3 {
            animation: div_animation_effect3 1s 1;
          }
          .animationTest4 {
            animation: div_animation_effect4 1.25s 1;
          }
          .animationTest5 {
            animation: div_animation_effect5 1.5s 1;
          }
          .animationTest6 {
            animation: div_animation_effect6 1.75s 1;
          }
          .animationTest7 {
            animation: div_animation_effect7 2s 1;
          }

          @keyframes div_animation_effect0 {
            0%   { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            50%  { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect1 {
            0%   { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            50%  { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect2 {
            0%   { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            50%  { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect3 {
            0%   { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            50%  { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect4 {
            0%   { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            50%  { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect5 {
            0%   { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            50%  { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect6 {
            0%   { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            50%  { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }
          @keyframes div_animation_effect7 {
            0%   { transform: translate(${animationTestNumberP}vw, ${animationTestNumberN}vh);}
            50%  { transform: translate(${animationTestNumberN}vw, ${animationTestNumberP}vh);}
            100% { transform: translate(0px, 0vh);}
            // 0%   { transform: scale(1, 0.01); transform: rotate(0turn);}
            // 100% { transform: scale(1, 1); transform: rotate(1turn);}
          }

          `}</style>
    </div>
  );
}

export default connect()(Contact);
