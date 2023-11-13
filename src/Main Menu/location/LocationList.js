import React from 'react'
import Location from './Location'

export default function LocationList({ locations, toggleLocation }) {
  return (
    locations.map(location => {
      return <Location key={location.id} toggleLocation={toggleLocation} location={location} />
    })
  )
}