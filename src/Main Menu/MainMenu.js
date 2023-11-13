import React from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

export default function MainMenu() {
  return (
    
    <div className='menu'>
      <div>
        <Link to={'./timeline'} className='secBtn'>
        
            <span className='secBtnTxt'>Timeline</span>
          
        </Link>
      </div>
      <div className='btn-group'>
        <Link to={'./characters'}>
          <div className='btn'>
            <span className='btnTxt'>Characters</span>
          </div>
        </Link>
        <Link to={'./WorldBuilding'} className='btn'>
          
            <span className='btnTxt'>Worldbuilding</span>
        </Link>
      </div>
      <div>
        <Link to={'./RelationshipChart'} className='btn'>
            <span className='btnTxt'>&nbsp; Relationship &nbsp; Chart</span>
        </Link>
      </div>
    </div>
  );
}
