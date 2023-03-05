import { useEffect, useState } from 'react';

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

  return <button onClick={handleToggle}>{group.text}</button>;
}
