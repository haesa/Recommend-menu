import React from 'react';
import Category from '../Category/Category';
import styles from './Categories.module.css';

export default function Categories({ groups, setFilter }) {
  return (
    <div className={styles.categories}>
      {groups.map((group) => (
        <Category key={group.id} group={group} setFilter={setFilter} />
      ))}
    </div>
  );
}
