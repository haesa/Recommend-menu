import { useEffect, useState } from 'react';
import styles from './Category.module.css';

export default function Category({ group, setFilter }) {
  const [select, setSelect] = useState(group.select);
  const handleToggle = () => setSelect(!select);
  useEffect(
    () =>
      setFilter((prev) => ({
        ...prev,
        groups: prev.groups.map((item) =>
          item === group ? { ...item, select } : item,
        ),
      })),
    [select],
  );

  return (
    <button
      className={`${styles.category} ${select && styles.select}`}
      onClick={handleToggle}
    >
      {group.text}
    </button>
  );
}
