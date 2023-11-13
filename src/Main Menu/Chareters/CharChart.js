import './CharChart.css';
import { Graph } from "react-d3-graph";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




const config = {
  
  height: window.innerHeight,
  width: window.innerWidth,
  initialZoom: 1,
  node: {
      fontSize: 20,
      highlightFontSize: 12,
      highlightFontWeight: "bold",
      highlightStrokeColor: "blue",
      labelProperty: "name",
      size: 500,
      strokeWidth: 2,
      fontColor: 'white',
  },
  link: {
      
      labelProperty: "linkText",
      highlightColor: "blue",
      renderLabel: false,
      highlightFontWeight: "bold",
      semanticStrokeWidth: true,
      fontSize: 20,
      fontColor: 'white',
      strokeWidth: 6
  },
  
};


export default function CharChart({characters, setCharacters}) {
  const [isViewing, setView] = useState(false)
  console.log(isViewing)
  function viewLinks(){
    console.log(isViewing)
    setView(!isViewing)
    config.link.renderLabel = !isViewing
    console.log(isViewing)
  }

    
  const onZoomChange = function (previousZoom, newZoom) {
    config.initialZoom = newZoom
  };



  const onNodePositionChange = function(nodeId, cx, cy) {
    const newCharacters = [...characters]
    for(const character of newCharacters){
      if(character.name === nodeId){
        character.fx = cx
        character.fy = cy
        setCharacters(newCharacters)
      }
    }
    for(let i = 0; i<data.nodes.length; i++){
      console.log(data.nodes[i])

      if(data.nodes[i].id === nodeId)
      data.nodes[i].fx = cx
      data.nodes[i].fy = cy
    }
    
 
    ;
  };
  const [data, setData] = useState({ nodes: [], links: [] });



  useEffect(() => {
    const charNodes = []
    const linksToRender =[]
    const charToNode =  [...characters].filter(character => character.linkedNodes.length > 0)
    const charToNodeMap = new Map(charToNode.map(node => [node.name, node]))
      const linkSet = new Set()

      for(const character of charToNode){
        const newNode = {id: character.name, fx:character.fx , fy: character.fy, svg: character.image}
        charNodes.push(newNode)
        
        
        for (const linkedNodeName of character.linkedNodes) {
          const linkedNode = charToNodeMap.get(linkedNodeName.name)
          if (linkedNode) {
            const linkKey = [character.name, linkedNodeName.name].sort().join('-')
            if (!linkSet.has(linkKey)) {
              if(selectedLink && selectedLink.source === character.name && selectedLink.target === linkedNode.name){
                linksToRender.push({ source: character.name, target: linkedNodeName.name, color:linkedNodeName.color, renderLabel: isViewing, linkText:linkedNodeName.linkText, strokeWidth:15  })
              }
              else{
              linksToRender.push({ source: character.name, target: linkedNodeName.name, color:linkedNodeName.color, renderLabel: isViewing, linkText:linkedNodeName.linkText  })
              linkSet.add(linkKey);
              console.log(linkedNodeName.linkText)
            }
            }
          }
        }
      }
      if(charNodes.length === 0){
        const placeholder = {id: 'placeholder', opacity: 0.01,}
        charNodes.push(placeholder);
      }
  
  
      setData({
        nodes: charNodes,
        links: linksToRender 
      });
    
      
    }, [characters], [isViewing]);
    







  const [selectedLink, setLink] = useState('')

  if(selectedLink){console.log(data.links.indexOf(selectedLink))}
    const onClickLink = function(source, target) {
      const newLinks = [...data.links]
     
      for(const link of newLinks){
        
        if(link.source === source && link.target === target ){
          if(selectedLink  ){
            if(selectedLink.source === source && selectedLink.target === target ){
            setLink('')
            link.strokeWidth = 6
          }
          else{
            newLinks[newLinks.indexOf(selectedLink)].strokeWidth = 6
            setLink(link)
            link.strokeWidth = 15
          }
         
          }
        
          else{
            
          setLink(link)
          link.strokeWidth = 15
        }
          setData({
            nodes: data.nodes,
            links: newLinks 
          })
          

         
        }
      }
   
 };

 function deleteLink(){
  const source = selectedLink.source
  const target =selectedLink.target
  const newCharacters = [...characters]
  for(const character of newCharacters){
    if(character.name === target || character.name === source){
      for(const deletedLink of character.linkedNodes){
        if(deletedLink.name === target || deletedLink.name === source){
          let index= character.linkedNodes.indexOf(deletedLink)
          character.linkedNodes.splice(index,1)
          setCharacters(newCharacters)
          setLink('')
        }
      }
    }}}
/* if(isEditing){
       
        } */

  return (
    <div className="App">
      <Graph
            className='graph'
            id="graph-id"
            data={data}
            config={config}
            onNodePositionChange={onNodePositionChange}
            onClickLink={onClickLink}
            onZoomChange={onZoomChange}
        />
        <Link to={'./newRelation'} className='btn' id='addRelation'>Add Relationship</Link>
        <div id='btnDivChart'>
        
        <button onClick={viewLinks} className='btn' id='viewButton'  >{isViewing ? 'hide connection type' : 'View connection type'}</button>
        {selectedLink && <button onClick= {deleteLink} id='editButton' className='btn'> Delete connection</button>}
        </div>
    </div>
  );
}
