export default function Category({ category, onClick }) {
  return <button onClick={() => onClick(category)}>{category}</button>;
}
