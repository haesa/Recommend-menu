import { useState } from 'react';

export default function Button({ filter }) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <button onClick={() => setIsSelected((prev) => !prev)}>{filter}</button>
  );
}
