import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Button from '../Button/Button';
import Categories from '../Categories/Categories';
import DropBox from '../DropBox/DropBox';
import styles from './Filter.module.css';

const university = { filter: '숙명여대', text: '숙명여자대학교' };
const groups = [
  { id: v4(), filter: '한', text: '한식', select: true },
  { id: v4(), filter: '중', text: '중식', select: false },
  { id: v4(), filter: '일', text: '일식', select: false },
  { id: v4(), filter: '서양', text: '양식', select: false },
  {
    id: v4(),
    filter: '분식 및 김밥 전문',
    text: '분식 및 김밥',
    select: false,
  },
  { id: v4(), filter: '치킨 전문', text: '치킨', select: false },
  {
    id: v4(),
    filter: '피자, 햄버거, 샌드위치 및 유사',
    text: '패스트푸드 및 간편식',
    select: false,
  },
  { id: v4(), filter: '그외 기타', text: '그 외 기타', select: false },
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
    <section className={styles.filter}>
      <DropBox univ={filter.university} setFilter={setFilter} />
      <Categories groups={filter.groups} setFilter={setFilter} />
      <Button text="선택" handleClick={handleClick} />
    </section>
  );
}
