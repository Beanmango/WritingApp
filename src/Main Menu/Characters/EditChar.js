import React, { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function EditChar({ characters, setCharacters }) {
  const received = useLocation();
  const navigate = useNavigate();
  const character = received.state;
  const characterNameRefEdit = useRef();
  const characterDiscRefEdit = useRef();
  const [currentImage, setCurrentImage] = useState(character.image);
  const characterImageRef = useRef();

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

  function editHandle() {
    const newCharacters = [...characters];
    for (let i = 0; i < newCharacters.length; i++) {
      if (newCharacters[i].id === character.id) {
        newCharacters[i].name = characterNameRefEdit.current.value;
        newCharacters[i].description = characterDiscRefEdit.current.value;
        newCharacters[i].image = currentImage;
        for(let i = 0; i< newCharacters.length; i++){
          for(let j = 0; j< newCharacters[i].linkedNodes.length; j++){
            if(characters.id === newCharacters[i].linkedNodes[j].id){
              newCharacters[i].linkedNodes[j].name = characterNameRefEdit.current.value
            }
          }
    
    }
        break;
      }
    }

    setCharacters(newCharacters);
    navigate('/characters');
  }

  const onImageClick = () => {
    if (characterImageRef.current) {
      characterImageRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    editHandle(); // Call your editHandle function when the form is submitted
  };
  return (
    <>
    <Link to={'../'} state={character} className='backBtn'> Go Back</Link>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <form onSubmit={handleSubmit}>
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

              {currentImage && <p style={{ alignSelf: 'center', color: 'white', zIndex: '100' }}>Add Image</p>}

            </div>
          </div>
          <div style={{ marginLeft: '21px' }}>
            <p id='nameTxt'>Name:</p>
            <input ref={characterNameRefEdit} defaultValue={character.name} type="text" maxLength="20" style={{ height: '16px', width: '100px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ marginLeft: '5px' }}>Character Description</p>
          <textarea ref={characterDiscRefEdit} defaultValue={character.description} id='discIn'></textarea>
        </div>
        <button type="submit" className='btn'>Edit Character</button>
      </form>
    </div>
    </>
  );
}
