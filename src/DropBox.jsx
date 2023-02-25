import React from 'react';

export default function DropBox({ univs }) {
  return (
    <select name='univs'>
      {univs.map((univ, index) => (
        <option key={index} value={univ}>
          {univ}
        </option>
      ))}
    </select>
  );
}
