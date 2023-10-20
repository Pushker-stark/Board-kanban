import React from 'react'
import "./NewCard.css";

export default function NewCard({cardData}) {
  return (
    <div className='card-parent'>
      <span>{cardData.id}</span>
      <span>{cardData.title}</span>
      {cardData.tag.map((tags, i)=> <span key={i+tags}>{tags}</span> )}
    </div>
  )
}
