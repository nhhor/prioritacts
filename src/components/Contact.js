import React from 'react';

function Contact(props){

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
        eventString = `Upcoming event in ${finalResult*-1} days, on ${mostRecentEvent.date.month}/${mostRecentEvent.date.day}!`
      } else if ( finalResult === 0 ) {
        eventString = `Upcoming event today!`
      } else if ( finalResult < 365 ) {
        eventString = `Last interaction ${finalResult} days ago.`
      } else {
        eventString = `Last interaction ${(finalResult/365).toFixed(2)} years ago.`
      }
      return `>${eventString}`;
    }
  };

  let userDefined = () => {
    if (props.userDefined === '' || typeof(props.userDefined) === undefined) {
      return
    } else {
      const userDefinedFields = props.userDefined.map(x => {
        if (x.key === '~prioritacts~frequency~') {
          return `Frequency set: ${x.value}`;
        } else {
          return
        }

      });
      return userDefinedFields;
    }
  };

  let handleDetailClick = (arg) => {
    let x = document.getElementById(arg)
    x.style.display = x.style.display == 'none' ? 'block' : 'none';
  }

  let handleSettingsClick = (arg) => {
    console.log(`dispatch settings update for ${arg}`);
  }


  return (
    <div className='contactSection'>
      <div className='contactRow' id={'contactCell_' + props.id}>
        <div className='gridParent'>

          <div className='gridDiv1' onClick={() =>{handleDetailClick('gridDiv4_' + props.id)}}>
            <img className='contactPhoto' alt='src...' id={props.photo}/>
          </div>

          <div className='gridDiv2'>
            <p className='contactName'>{props.name}</p>
          </div>

          <div className='gridDiv3'>
            <p>
              <span className='contactUserDefined'>{userDefined()}</span>
              <span className='settingsSpan' onClick={() =>{handleSettingsClick(props.id)}}>{`<<`}</span>
            </p>
          </div>

          <div className='gridDiv4' id={'gridDiv4_' + props.id}>
            <p className='contactBirthday'>{birthday()}</p>
            <p className='contactEvent'>{events()}</p>
          </div>
          <div className='gridDiv5'  id={'gridDiv5_' + props.id}>
            <p className='communicateRow'>
              <a className='contactMethod' href={'mailto:'+props.email}>
                <button className="buttonEMail">Email</button>
              </a>
              <a className='contactMethod' href={'sms:'+props.phone}>
                <button className="buttonText">Text</button>
              </a>
              <a className='contactMethod' href={'tel:'+props.phone}>
                <button className="buttonPhone">Call</button>
              </a>
              <a className='contactMethod' href="">
                <button className="buttonVisit">Visit</button>
              </a>
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

          .settingsSpan {
            float: right;
          }
          .contactUserDefined{
            font-size: 0.75em;
          }
          .contactBirthday{
            font-size: 0.75em;
          }
          .contactEvent{
            font-size: 0.75em;
          }

          `}</style>
      </div>
    );
  }

  export default Contact;
