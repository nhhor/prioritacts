import React from 'react';

function Contact(props){

  let birthday = () => {
    let bYear = [props.birthday].map(e => e.year)[0]
    let bMonth = [props.birthday].map(e => e.month)[0]
    let bDay = [props.birthday].map(e => e.day)[0]
    let bString = (`${bYear}-${bMonth}-${bDay}`);


    if (bString === 'undefined-undefined-undefined') {
      return;
    } else if (bMonth === 'undefined') {
      return
    } else {
      var one_day = 1000 * 60 * 60 * 24
      var today = new Date();
      var birthDate = new Date(today.getFullYear(), (bMonth-1), bDay+1)
      if (today.getMonth() > (bMonth+1) && today.getdate() > bDay)
      birthDate.setFullYear(birthDate.getFullYear() + 1)
      var bResult = Math.round(birthDate.getTime() - today.getTime()) / (one_day);
      var finalResult = bResult.toFixed(0);
      let string = `Birthday in ${finalResult} days!`
      if (finalResult >=0 && finalResult <= 45) {
        return string
      } else {
        return
      }
    }
  };

  return (
    <div className='contactSection'>
      <div className='contactRow' id={'contactCell_' + props.id}>
        <p className='contactName'>{props.index}) {props.name}</p>
        <p className='contactBirthday'>{birthday()}</p>
        <p className='contactPhone'>{props.id}</p>
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
