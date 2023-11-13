import React from 'react'
import Chapter from './Chapter'

export default function ChapterList({ chapters}) {
  console.log(chapters)
  if(chapters.length > 0){
  return (
    chapters.map(chapter => {
      return <Chapter key={chapter.id}  chapter={chapter}  />
    })
  )}
  else{
    return(
      <p>Get started by adding a new chapter</p>
    )
  }
}