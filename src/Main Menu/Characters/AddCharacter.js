import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import defaultImage from './malesilluete.jpg'; 
import imgPic from './picImg.svg'
import './AddCharacter.css'

export default function AddCharacter({ characters, setCharacters }) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(defaultImage);
  function onChangeImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = event.target.result;
        setCurrentImage(imageData); // Update the preview image
      };
      reader.readAsDataURL(file);
    }
  }
  function handleAddCharacter(e) {
    const description = characterDiscRef.current.value;
    const name = characterNameRef.current.value;

    if (name === '') return;

    const characterImageRef = document.getElementById('image-preview');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const radius = Math.min(characterImageRef.offsetWidth, characterImageRef.offsetHeight) / 2;
    const centerX = radius;
    const centerY = radius;

    canvas.width = radius * 2;
    canvas.height = radius * 2;

    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.clip();

    const img = new Image();
    img.src = currentImage;

    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const circularImage = canvas.toDataURL('image/png');

      const imageToPut = circularImage || ' ';
      const newCharacters = [...characters];
      newCharacters.push({
        id: uuidv4(),
        name: name,
        description: description,
        
        fx: Math.floor(Math.random() * 601) ,
        fy: Math.floor(Math.random() * 601) ,
        linkedNodes: [],
        image: imageToPut,
      });
      setCharacters(newCharacters);

      navigate('../');
    };
  }

  const characterImageRef = useRef();
  const characterNameRef = useRef();
  const characterDiscRef = useRef();
  const onImageClick = () => {
    if (characterImageRef.current) {
      characterImageRef.current.click();
    }
  };
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div id='backroundDiv'>
      <div>
      <input
        onChange={onChangeImage}
        ref={characterImageRef}
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
      />

      <div
        id="image-preview"
        style={{
          backgroundImage: currentImage ? `url(${currentImage})` : 'none',
        }}
        onClick={onImageClick}
      >
        <img src = {imgPic} alt='' style={{zIndex:'100'}}/>
        {currentImage && <p style={{alignSelf:'center', color:'white', zIndex:'100'}}>Add Image</p>}
        
      </div>
    </div>
    <div  style={{marginLeft:'21px'}}>
      <p id='nameTxt'>Name:</p>
      <input ref={characterNameRef} type="text" maxLength="20" style={{height: '16px', width:'100px'}} />
      </div>
      </div>
      <div style={{display:'flex', flexDirection:'column'}}>
      <p style={{marginLeft:'5px'}}>Character Description</p>
      <textarea ref={characterDiscRef} type="text" id='discIn'></textarea>
      <button onClick={handleAddCharacter} className='btn' style={{alignSelf:'flex-start'}}>Add Character</button>
 
      </div>
      
    </div>
  );
}