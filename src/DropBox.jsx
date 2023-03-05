import React from 'react';

const univs = ['숙명여대', '중앙대', '홍익대'];

export default function DropBox({ univ, handleUniv }) {
  return (
    <select
      name="univs"
      value={univ}
      onChange={(event) => handleUniv(event.target.value)}
    >
      {univs.map((univ, index) => (
        <option key={index} value={univ}>
          {univ}
        </option>
      ))}
    </select>
  );
}
