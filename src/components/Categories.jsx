import React from 'react';
import Category from './Category';

export default function Categories({ groups, setFilter }) {
  return (
    <div>
      {groups.map((group, index) => (
        <Category key={index} group={group} setFilter={setFilter} />
      ))}
    </div>
  );
}
