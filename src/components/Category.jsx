import React from 'react';
import Button from './Button';

const filter = [
  '한',
  '중',
  '일',
  '분식 및 김밥 전문',
  '치킨 전문',
  '서양',
  '그외 기타',
  '피자, 햄버거, 샌드위치 및 유사',
];

const categories = [
  '한식',
  '중식',
  '일식',
  '분식 및 김밥',
  '치킨',
  '패스트푸드 및 간편식',
  '그 외 기타',
];

export default function Category({ handleFilter }) {
  return (
    <div>
      {categories.map((category, index) => (
        <Button key={index} category={category} onClick={handleFilter} />
      ))}
    </div>
  );
}
