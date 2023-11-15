import React,{useState,useEffect,useRef} from 'react'
import ChartButtons from './ChartButtons'
import './AddRelationship.css'
import TypeList from './TypesList'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
export default function AddRelationship(characters, setCharacters) {

  const LOCATYPERKEY = 'characterRelation.types'
  const [types, setTypes] = useState([
    { color: '#FF69B4', linkText: 'Romantic Relationship', id: '1' }, 
    { color: '#000000', linkText: 'Enemies', id: '2' }, 
    { color: '#00FF00', linkText: 'Friendship', id: '3' }, 
    { color: '#9966CC', linkText: 'Family Relationship', id: '4' }, 
    { color: '#FF4500', linkText: 'Rivalry', id: '5' }, 
    { color: '#FFA07A', linkText: 'Mentorship', id: '6' }, 
    { color: '#00CED1', linkText: 'Partners in Crime', id: '7' }, 
    { color: '#FFFF00', linkText: 'Professional Relationship', id: '8' }, 
    { color: '#8B4513', linkText: 'Teacher-Student Relationship', id: '9' }, 
    { color: '#7300A0', linkText: 'Paranormal Relationship', id: '10' },
  ]);

  useEffect(() => {
    const storedTypes = JSON.parse(localStorage.getItem(LOCATYPERKEY))
    if (storedTypes) {setTypes(storedTypes)}
    }, [])
    useEffect(() => {
      localStorage.setItem(LOCATYPERKEY, JSON.stringify(types))
      }, [types])
   
  setCharacters = characters.setCharacters
  characters = characters.characters
  const navigate = useNavigate();
  const typeColor = useRef('')
  const typeName = useRef('')
  function addNewType(){
    const newTypes = [...types]
    const typeToAdd = { linkText: typeName.current.value, color: typeColor.current.value, id: uuidv4() }
    newTypes.push(typeToAdd)
    setTypes(newTypes)
    

  }

   
    const [selected, setSelected] = useState([])
    const [linkType, SetCurrentType] = useState('')
    const [isAdding, setAdding] = useState(false)
   
      function addType(type){
        if(linkType && type === linkType){
          SetCurrentType('')
        }
        
        else{
          SetCurrentType(type)
        }
        console.log(linkType)
      }
      function deleteType(type){
        const newTypes = types.filter(tempType => !(tempType.id === type.id))
      setTypes(newTypes)
      }

    function addToSelected(character){
      const newSelected = [...selected]
      if(newSelected[0] && character === newSelected[0]){
        newSelected.splice(0,1)
        setSelected(newSelected)
      }
      else if(newSelected[1] && character === newSelected[1]){
        newSelected.splice(1,1)
        setSelected(newSelected)
      }
      else if(newSelected.length < 2){
        newSelected.push(character)
        setSelected(newSelected)
      }
      else{return}
      
    }
    function openAdding(){
      setAdding(!isAdding)
    }

    function addRelationship(){
      if(selected.length === 2 && linkType){
        let tempChar = [...characters]
        for(const linkcheck of selected[0].linkedNodes){
          if(linkcheck.name === selected[1].name){
          alert('link already exists!')
          return
        }
        }
        for(const linkcheck of selected[1].linkedNodes){
          if(linkcheck.name === selected[0].name){
          alert('link already exists!')
          return
        }
        }
        for(let i = 0; i<tempChar.length; i++){
            if(tempChar[i] === selected[0]){
    
              tempChar[i].linkedNodes.push({name:selected[1].name,color:linkType.color, linkText:linkType.linkText} )
             
              setCharacters(tempChar)
            }
            if(tempChar[i] === selected[1]){
              tempChar[i].linkedNodes.push({name:selected[0].name, color:linkType.color, linkText:linkType.linkText})
  
              setCharacters(tempChar)
              ;
             
              
            }
            
        }
        setSelected([])
        SetCurrentType('')
        navigate('../');
      }
      }
    return (
      <>
        <div id='relationAddCon'>
          <div id='mainConRelation'>
            <ChartButtons characters={characters} addToSelected={addToSelected} selected={selected} />
          </div>
          <button className='btn' id='okBtn' onClick={addRelationship}>OK</button>
        </div>
        <div id='typesCon'>
          <h2>Choose Relationship Type</h2>
          <div style={{height:'50vh', overflowY:'auto'}}>
            <TypeList types={types} addType={addType} linkType={linkType} deleteType={deleteType} />
          </div>
          <div id='addingCon'>
          <div className='relationship-type' onClick={openAdding}>
            <div className="relationship-circle" style={{ backgroundColor: '#331803' }}></div>
            <span className="relationship-text">{isAdding ? 'Close' : 'Add Costume'}</span>
          </div>
          {isAdding && (
              <div className="additional-content">
                <p>Color</p>
                <input type='color' ref={typeColor} />
                <p>Relationship Type Name</p>
                <input type='text' ref={typeName} maxLength={30} />
                <button className='btn' onClick={addNewType}>Add</button>
              </div>
            )}
          </div>
        </div>
      </>
    );
}
