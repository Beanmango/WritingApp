import React, { useState } from 'react'
import './TimelineMain.css'
import ChapterList from './ChapterList';
import { Link } from 'react-router-dom';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'


export default function TimelineRender(chapters) {
  if(Orientation === 'portrait')
  {console.log( 'phone')}
  chapters = chapters.chapters
     const [page, setPage] = useState(0)
  const chaptersToDisplay= chapters.slice(page, page+10 );
  function handlePageUp() {
    if(chapters.length > page+9){
      setPage(page+10)
    }
    else{return}
  }
  function handlePageDown(){
    if(page>9){
      setPage(page-10)
    }
  }
  return (
    <DeviceOrientation lockOrientation={'landscape'}>
      <Orientation orientation='landscape' alwaysRender={false}>
        <div>
        <>
        
        <div id='chapterCon'>
          {page !== 0 && <div id='pageDown' onClick={handlePageDown}></div>}
          <ChapterList chapters={chaptersToDisplay} />
          {chapters.length > page+10 &&<div id='pageUp' onClick={handlePageUp}></div>}
        </div>
        <Link to={'./Add'} className='btn' >New Chapter</Link>
        </>
        </div>
      </Orientation>
      
      <Orientation orientation='portrait' alwaysRender={false}>
        <div>
          <p>Please rotate your device</p>
        </div>
      </Orientation>
    </DeviceOrientation>
  )
    } 
