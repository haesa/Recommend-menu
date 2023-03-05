import React, { useEffect, useState } from 'react';
import DropBox from '../DropBox';
import Button from './Button';
import Categories from './Categories';

const university = '숙명여대';
const groups = [
  { text: '한', select: true },
  { text: '중', select: false },
  { text: '일', select: false },
  { text: '분식 및 김밥 전문', select: false },
  { text: '치킨 전문', select: false },
  { text: '서양', select: false },
  { text: '그외 기타', select: false },
  { text: '피자, 햄버거, 샌드위치 및 유사', select: false },
];

const initial = JSON.parse(localStorage.getItem('filter')) ?? {
  university,
  groups,
};

export default function Filter({ filtering }) {
  const [filter, setFilter] = useState(initial);
  const handleClick = () => filtering(filter);

  useEffect(() => {
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);

  return (
    <>
      <DropBox univ={filter.university} setFilter={setFilter} />
      <Categories groups={filter.groups} setFilter={setFilter} />
      <Button text="선택" handleClick={handleClick} />
    </>
  );
}
