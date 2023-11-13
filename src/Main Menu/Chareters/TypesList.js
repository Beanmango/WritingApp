import React from 'react'
import Type from './Type'

export default function TypeList({ types,addType,linkType,deleteType  }) {
  return (
    types.map(type => {
      return <Type key={type.id} type={type} addType={addType} linkType={linkType} deleteType={deleteType}/>
    })
  )
}