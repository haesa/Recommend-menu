import React from 'react';
import Category from './Category';

const categories = [
  '한',
  '중',
  '일',
  '분식 및 김밥 전문',
  '치킨 전문',
  '서양',
  '그외 기타',
  '피자, 햄버거, 샌드위치 및 유사',
];

export default function Categories({ handleFilter }) {
  return (
    <div>
      {categories.map((category, index) => (
        <Category key={index} category={category} onClick={handleFilter} />
      ))}
    </div>
  );
}
