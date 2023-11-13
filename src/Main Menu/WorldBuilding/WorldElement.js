import React from 'react';
import { Link } from 'react-router-dom';

export default function WorldElement({ worldElement }) {
  return (
    <Link className='WorldBtn' to={worldElement.listName}>
      <p>{worldElement.listName}</p>
    </Link>
  );
}