import React from 'react'
import "./NewCard.css";

export default function NewCard({cardData,userCardData={}}) {
  console.log({userCardData});
  let priorPath;
  let statuspath;

  // Determine the image path based on conditions
  if (cardData.priority===0) {
    priorPath = './no_prior.png';
  } else if (cardData.priority===1) {
    priorPath = './urgent-icon.jpg';
  } else if (cardData.priority===2){
    priorPath = './high_prior.png';
  } else if(cardData.priority===3){
    priorPath = './mid_prior.png';
  }else {
    priorPath = './low_prior.png';
  }

  if (cardData.status==='Backlog') {
    statuspath = './cancel.svg';
  } else if (cardData.status==='Todo') {
    statuspath = './todo.png';
  }else {
    statuspath = './done.png';
  }

  return (
    <div className='card-parent'>
      <div id="up">
        <div className='left-column'>
          <span id="ticket_id">{cardData.id}</span>
        </div>
        {Object.keys(userCardData).length?<div className='right-column'>
          <div className='circle-big'> {userCardData.name?.slice(0,2).toUpperCase()}</div>
          {userCardData.available? <div className='circle dot-position green'></div>: <div className='circle dot-position lightgray'></div>}
        </div>:null}
      </div>

      <div id="mid">
          <span><img src={process.env.PUBLIC_URL + statuspath} width="20px" alt='status'/></span>
          <span id="ticket_title">{cardData.title}</span>
      </div>

      <div id="down">
          <span><img src={process.env.PUBLIC_URL + priorPath} width="20px" alt='high priority'/></span>
          {cardData.tag.map((tags, i)=> <span key={i+tags}>{tags}</span> )}
      </div>

    </div>
  )
}
