import React, {useEffect,useState} from 'react'
import { Route,Routes,Link,useLocation } from 'react-router-dom'
import MainMenu from './Main Menu/MainMenu'
import CharMenu from './Main Menu/Chareters/CharMenu'
import ViewCharacter from './Main Menu/Chareters/ViewCharacter'
import EditChar from './Main Menu/Chareters/EditChar'
import AddCharacter from './Main Menu/Chareters/AddCharacter'
import CharChart from './Main Menu/Chareters/CharChart'
import Timeline from './Main Menu/TimeLine/Timeline'
import AddChapter from './Main Menu//TimeLine/AddChapter'
import EventsMain from './Main Menu/TimeLine/EventsMain'
import AddEvent from './Main Menu/TimeLine/AddEvent'
import AddRelationship from './Main Menu/Chareters/AddRelationship'
import ViewEvent from './Main Menu/TimeLine/ViewEvent'
import WorldBuildingMain from './Main Menu/WorldBuilding/WorldBuildingMain'
import AddWorldElement from './Main Menu/WorldBuilding/AddWorldElement'
import WBEArray from './Main Menu/WorldBuilding/WBEArray'
import AddObject from './Main Menu/WorldBuilding/AddObject'
import ViewObject from './Main Menu/WorldBuilding/ViewObject'
import './App.css'
export default function App() {
  const LOCALCHARACTERKEY = 'characterMenu.characters'
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem(LOCALCHARACTERKEY))
    if (storedCharacters) {setCharacters(storedCharacters)}
    }, [])
  useEffect(() => {
    localStorage.setItem(LOCALCHARACTERKEY, JSON.stringify(characters))
    }, [characters])


    const LOCALWORLDBUILDINGARRAY = 'worldMenu.world'
    const [worldElements, setWorldElements] = useState([{listName:'Locations' , id:'59086245-54ac-418c-b8c7-bae22533ec77' , array:[]},
     {listName:'Spells' , id:'a39feeaa-2a4b-4bec-ae95-9ccbfe963b0c' , array:[]},
     {listName:'Items' , id:'d26093d7-805b-4b4c-938f-80241ab990b0' , array:[]},
     {listName:'Races' , id:'e7528787-11a2-44a4-8c59-9e414b3c37d6' , array:[]},
     {listName:'Religions' , id:'24dbfb18-8015-4c35-86f4-2b879411288c' , array:[]},
     {listName:'Flora and Fauna' , id:'1a06fe51-1191-488f-a0db-91e7f074161e' , array:[]},])
    useEffect(() => {
      const worldElements = JSON.parse(localStorage.getItem(LOCALWORLDBUILDINGARRAY))
      if (worldElements) {setWorldElements(worldElements)}
      }, [])
    useEffect(() => {
      localStorage.setItem(LOCALWORLDBUILDINGARRAY, JSON.stringify(worldElements))
      }, [worldElements])

    const CHAPTERSTORAGEKEY = 'chaptersMenu.chapters'
    const [chapters, setChapters] = useState([]);
      useEffect(() => {
        const storedChapters = JSON.parse(localStorage.getItem(CHAPTERSTORAGEKEY))
        if (storedChapters) {setChapters(storedChapters)}
        }, [])
        useEffect(() => {
          localStorage.setItem(CHAPTERSTORAGEKEY, JSON.stringify(chapters))
          }, [chapters])
          const location = useLocation();
          const isMainMenu = location.pathname === '/WritingApp';
          const isEditPage = location.pathname.endsWith('Edit');
          const isAddingEvent = location.pathname.endsWith('AddEvent')
          
    return(
  <>
  {!isMainMenu && !isEditPage && !isAddingEvent && <Link to={'..'} relative='path' className='backBtn'> Go Back</Link>}

  <Routes>
    <Route path='/' element={<MainMenu/>}/>

    {/* Worldbuilding */}
    <Route path='/WorldBuilding'>
      <Route index element={<WorldBuildingMain worldElements={worldElements} setWorldElements={setWorldElements}/>} />
      <Route path='Add' element={<AddWorldElement worldElements={worldElements} setWorldElements={setWorldElements}/>}/>
      <Route path=':id'>
        <Route index element={<WBEArray worldElements={worldElements} setWorldElements={setWorldElements} />}/>
        <Route path='Add' element={<AddObject worldElements={worldElements} setWorldElements={setWorldElements}/>}/>
        <Route path='View' element={<ViewObject worldElements={worldElements} setWorldElements={setWorldElements}/>} />
      </Route>
    </Route>


    {/* Characters */}
    <Route path='/characters'>
      <Route index element ={<CharMenu characters={characters} setCharacters={setCharacters}/>}/>
      <Route path='Add' element ={<AddCharacter characters={characters} setCharacters={setCharacters}/>}/>

      <Route path=':id'>
        <Route index element={<ViewCharacter characters={characters} setCharacters={setCharacters}/>}/>
        <Route path='Edit' element = {<EditChar characters={characters} setCharacters={setCharacters}/>}/>
      </Route>
    </Route>
    {/* RelationshipChart */}
    <Route path='/RelationshipChart' >
      <Route index element={<CharChart characters={characters} setCharacters={setCharacters} />}/>
      <Route path='newRelation' element = {<AddRelationship characters={characters} setCharacters={setCharacters} />}/>
    </Route>

    {/* TimeLine */}
    <Route path='/timeline'>
      <Route index element={<Timeline chapters={chapters}/>} />
      <Route path='Add' element={<AddChapter chapters={chapters} setChapters={setChapters}/>} />
      <Route path=':id' >
        <Route index element={<EventsMain chapters={chapters} setChapters={setChapters} />}/>
        <Route path='AddEvent' element={<AddEvent chapters={chapters} setChapters={setChapters} />}/>
        <Route path='Edit' element={<ViewEvent chapters={chapters} setChapters={setChapters} /> } />
      </Route>  
    </Route>
  </Routes>
  </>
  )
}
