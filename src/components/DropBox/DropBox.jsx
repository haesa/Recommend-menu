import React, { useEffect, useState } from 'react';
import styles from './DropBox.module.css';

const univs = [
  { filter: '숙명여대', text: '숙명여자대학교' },
  { filter: '중앙대', text: '중앙대학교' },
  { filter: '홍익대', text: '홍익대학교' },
];

export default function DropBox({ univ, setFilter }) {
  const [university, setUniversity] = useState(univ);
  const handleChange = (e) => setUniversity(e.target.value);
  useEffect(() => setFilter((prev) => ({ ...prev, university })), [university]);

  return (
    <select
      className={styles.dropBox}
      name="univs"
      value={university}
      onChange={handleChange}
    >
      {univs.map((univ, index) => (
        <option key={index} value={univ.text}>
          {univ.text}
        </option>
      ))}
    </select>
  );
}
