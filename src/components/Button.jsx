export default function Button({ category, onClick }) {
  return <button onClick={() => onClick(category)}>{category}</button>;
}
