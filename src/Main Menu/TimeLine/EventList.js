import React from 'react'
import Event from './Event'


export default function EventList({ events ,chapterId,changeEventPosition}) {
  if(events){
  return (
    events.map(event => {
      return <Event key={event.id}  event={event} events={events} chapterId={chapterId} changeEventPosition={changeEventPosition} />
    })
  )
}
else{ 
return(
  <div>
    <p>Need Events</p>
  </div>
)
} 
}