import React from 'react'

export default function LocList() {
    const LOCAL_STORAGE_KEY = 'locationMenu.locations'
    const storedLocations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  return (
    <div>
      {storedLocations[0].name}
    </div>
  )
}
