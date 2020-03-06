import React from 'react';

function Contact(props){

  let birthday = () => {
    let bYear = [props.birthday].map(e => e.year)
    let bMonth = [props.birthday].map(e => e.month)
    let bDay = [props.birthday].map(e => e.day)
    let bString = (`${bYear[0]}-${bMonth[0]}-${bDay[0]}`);
    let today = ( `${Date()}`.substr(4,11) )

    if (bString == 'undefined-undefined-undefined') {
      return;
    } else if (typeof(bMonth) == 'undefined') {
      return;
    } else {

      let one_day = 1000 * 60 * 60 * 24
      let present_date = new Date();
      let birth_day = new Date(present_date.getFullYear(), bMonth, bDay)

      if (present_date.getMonth() == bMonth && present_date.getdate() > bDay)
      birth_day.setFullYear(birth_day.getFullYear() + 1)

      let Result = Math.round(birth_day.getTime() - present_date.getTime()) / (one_day);

      let Final_Result = Result.toFixed(0);
      let bDayIn = `Birthday in ${Final_Result} days! (on ${bMonth}/${bDay})`
      return bDayIn;
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
