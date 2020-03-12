import React from 'react';
import { connect } from 'react-redux';
import { fetchNewVisit } from "./../actions";

function Contact(props){

  let animationTestNumberP = (Math.floor(Math.random()*101)+75)
  let animationTestNumberN = (Math.floor(Math.random()*101)-125)

  let birthday = () => {
    const bYear = [props.birthday].map(e => e.year)[0]
    const bMonth = [props.birthday].map(e => e.month)[0]
    const bDay = [props.birthday].map(e => e.day)[0]
    const bString = (`${bYear}-${bMonth}-${bDay}`);
    if (bString === 'undefined-undefined-undefined') {
      return;
    } else if (bMonth === 'undefined') {
      return
    } else {
      const today = new Date();
      const birthDate = new Date(today.getFullYear(), (bMonth-1), bDay+1)
      if (today.getMonth() > (bMonth+1) && today.getdate() > bDay)
      birthDate.setFullYear(birthDate.getFullYear() + 1)
      const bResult = Math.round(birthDate.getTime() - today.getTime()) / (86400000);
      const finalResult = bResult.toFixed(0);
      const string = `Birthday in ${finalResult} days (on ${bMonth}/${bDay})!`
      if (finalResult >=0 && finalResult <= 45) {
        return string
      } else {
        return
      }
    }
  };

  let events = () => {
    if (props.events === '' || typeof(props.events) === undefined) {
      return
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
      const length = props.events.length
      const mostRecentEvent = props.events.sort(compare)[length-1]
      const today = new Date();
      const eventDate = new Date(mostRecentEvent.date.year, (mostRecentEvent.date.month-1), mostRecentEvent.date.day)
      const bResult = Math.round(eventDate.getTime() - today.getTime()) / (86400000);
      const finalResult = bResult.toFixed(0) * -1;
      let eventString;
      if ( finalResult < 0 ) {
        eventString = `Upcoming event in ${finalResult*-1+1} days, on ${mostRecentEvent.date.month}/${mostRecentEvent.date.day}!`
      } else if ( finalResult === 0 ) {
        eventString = `Upcoming event today!`
      } else if ( finalResult < 365 ) {
        eventString = `Last interaction ${finalResult} days ago.`
      } else {
        eventString = `Last interaction ${(finalResult/365).toFixed(2)} years ago.`
      }
      return `${eventString}`;
    }
  };

  let userDefinedPriority = () => {
    if (props.userDefined === '' || typeof(props.userDefined) === undefined || props.userDefined === [] ) {
      return
    } else {
      const userDefinedFields = props.userDefined.map(x => {
        if (x.key === '~prioritacts~frequency~') {
          return `Priority set to ${x.value}`;
        } else {
          return '';
        }
      });
      return userDefinedFields;
    }
  };

  let userDefinedLastInteraction = () => {
    if (props.userDefined === '' || typeof(props.userDefined) === undefined || props.userDefined === [] ) {
      return
    } else {
      const userDefinedFields = props.userDefined.map(x => {
        if (x.key === '~prioritacts~lastContact~') {
          let iS = x.value.split('-')
          let interactionDate = new Date((iS[0]),(iS[1]-1),(iS[2]))
          let today = new Date()
          let roundedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
          let diff = Math.round((roundedToday.getTime() - interactionDate.getTime()) / (86400000))
          if (diff === 0) {
            return `Last interaction (${iS[3]}) was today!`;
          } else if (diff < 365 ) {
            return `Last interaction (${iS[3]}) was ${diff} days ago.`;
          } else {
            return `Last interaction (${iS[3]}) was ${(diff/365).toFixed(2)} years ago.`;
          }
        } else {
          return '';
        }
      });
      return userDefinedFields;
    }
  };

  let handleDetailClick = (arg) => {
    let x = document.getElementById(arg)
    x.style.display = x.style.display === 'none' ? 'block' : 'none';
  }

  let handleInteractionClick = (id, etag, userDefined, interactionType, redirect) => {
    console.log('userDefined', userDefined);
    console.log('interactionType', interactionType);
    console.log('redirect', redirect);
    let today = new Date();
    let userDefinedUpdate = []
    if (userDefined == [] || userDefined == undefined || userDefined == null || userDefined == '' ) {
      userDefinedUpdate.push({key: "~prioritacts~lastContact~", value: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}-${interactionType}`})
    } else {
      userDefined.map(function(e, index) {
        if (e.key == "~prioritacts~lastContact~") {
          return
        } else {
          userDefinedUpdate.push(e);
        }
        userDefinedUpdate.push({key: "~prioritacts~lastContact~", value: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}-${interactionType}`})
      });
    }
    const { dispatch } = props;
    dispatch(fetchNewVisit(id, etag, userDefinedUpdate, props.token));
    if (interactionType === 'visit') {
      return
    } else {
      window.open(redirect, '_blank')
    }
  }

  return (
    <div className={'contactSection ' + props.animationTest}>
      <div className='contactRow' id={'contactCell_' + props.id}>
        <div className='gridParent'>

          <div className='gridDiv1' onClick={() =>{handleDetailClick('gridDiv4_' + props.id)}}>
            <img className='contactPhoto' alt={`(p${props.index})`} id={props.photo}/>
          </div>

          <div className='gridDiv2'>
            <p className='contactName'>{props.name}</p>
          </div>

          <div className='gridDiv3'>
            <div>
              <div className='contactUserDefined'>{userDefinedPriority()}</div>
              <div className='settingsForm'>
                <form>
                  <input type='text' size='4'></input>
                  <button>S</button>
                </form>
              </div>
              <div className='settingsTrigger'>{`<<`}</div>
            </div>
          </div>

          <div className='gridDiv4' id={'gridDiv4_' + props.id}>
            <p className='contactBirthday'>{birthday()}</p>
            <p className='contactLastInteraction'>{userDefinedLastInteraction()}</p>
            <p className='contactEvent'>{events()}</p>
          </div>
          <div className='gridDiv5'  id={'gridDiv5_' + props.id}>
            <p className='communicateRow'>
              <span className='contactMethod'>
                <button className="buttonEMail" onClick={() =>{handleInteractionClick(props.id, props.etag, props.userDefined, 'email', `https://mail.google.com/mail/?view=cm&fs=1&to=${props.email}&body=%0A%0A%0A~This message was created with the Prioritacts App!~`)}}>Email</button>
              </span>
              <span className='contactMethod'>
                <button className="buttonText" onClick={() =>{handleInteractionClick(props.id, props.etag, props.userDefined, 'text', `sms:${props.phone}`)}}>Text</button>
              </span>
              <button className="buttonPhone" onClick={() =>{handleInteractionClick(props.id, props.etag, props.userDefined, 'call', `tel:${props.phone}`)}}>Call</button>
              <span className='contactMethod'>
                <button className="buttonVisit" onClick={() =>{handleInteractionClick(props.id, props.etag, props.userDefined, 'visit', 'visit')}}>Visit</button>
              </span>
            </p>
          </div>

        </div>
      </div>
      <style>{`

          .gridParent {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: 25px 25px 1fr 20px;
            grid-column-gap: 3px;
            grid-row-gap: 3px;
          }

          .gridDiv1 { grid-area: 1 / 1 / 3 / 2; }
          .gridDiv2 { grid-area: 1 / 2 / 2 / 7; }
          .gridDiv3 { grid-area: 2 / 2 / 3 / 7; }
          .gridDiv4 { grid-area: 3 / 1 / 4 / 7; }
          .gridDiv5 { grid-area: 4 / 1 / 5 / 7; }

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
            padding-bottom: 6px;
            margin-bottom: 5px;
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
            text-align: right;
          }

          .contactMethod {
          }

          .buttonEMail {
            // height: 20px;

            background-color: rgba(255,0,0,.33);
            border-radius: 25px;
            width: 20%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          .buttonText {
            background-color: rgba(255,255,0,.33);
            border-radius: 25px;
            width: 20%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          .buttonPhone {
            background-color: rgba(0,255,0,.33);
            border-radius: 25px;
            width: 20%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          .buttonVisit {
            background-color: rgba(0,0,255,.33);
            border-radius: 25px;
            width: 20%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          .settingsTrigger {
            position: absolute;
            right: 5%;
;
          }
          .settingsForm {
            position: absolute;
            right: 15%;
            // width: 50px;
          }
          .contactUserDefined{
            position: absolute;

            font-size: 0.75em;
          }
          .contactBirthday{
            font-size: 0.75em;
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

  Contact = connect()(Contact);

  export default Contact;
