import React, { useEffect, useState } from 'react';

const univs = ['숙명여대', '중앙대', '홍익대'];

export default function DropBox({ univ, setFilter }) {
  const [university, setUniversity] = useState(univ);
  const handleChange = (e) => setUniversity(e.target.value);
  useEffect(() => setFilter((prev) => ({ ...prev, university })), [university]);

  return (
    <select name="univs" value={university} onChange={handleChange}>
      {univs.map((univ, index) => (
        <option key={index} value={univ}>
          {univ}
        </option>
      ))}
    </select>
  );
}
