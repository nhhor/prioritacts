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
      let string = `Birthday in ${finalResult} days (on ${bMonth}/${bDay})!`
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
        <div className='gridParent'>

          <div className='gridDiv1'>
            <img className='contactPhoto' src={props.photo+'?access_token='+props.accessToken}/>
          </div>

          <div className='gridDiv2'>
            <p className='contactName'>{props.name}</p>
          </div>

          <div className='gridDiv3'>
            <p>{props.index}) ...freq</p>
          </div>

          <div className='gridDiv4'>
            <p className='contactBirthday'>{birthday()}</p>
            <p className='contactBirthday'>{birthday()}</p>
          </div>
          <div className='gridDiv5'>
            <p className='communicateRow'>
              <a className='contactMethod' href={'mailto:'+props.email}>
                <button className="buttonEMail">Email</button>
              </a>
              <a className='contactMethod' href={'tel:'+props.email}>
                <button className="buttonText">Text</button>
              </a>
              <a className='contactMethod' href={'tel:'+props.email}>
                <button className="buttonPhone">Call</button>
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
            // padding: 3px;
          }

          .contactPhoto {
            width: 50px;
            height: 50px;
            border-radius: 50px;
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
            width: 25%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          .buttonText {
            background-color: rgba(0,255,0,.33);
            border-radius: 25px;
            width: 25%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          .buttonPhone {
            background-color: rgba(0,0,255,.33);
            border-radius: 25px;
            width: 25%;
            font-weight: bolder;
            padding-left: 2%;
            padding-right: 2%;
            margin-left: 2%;
            margin-right: 2%;
          }

          `}</style>
      </div>
    );
  }

  export default Contact;
