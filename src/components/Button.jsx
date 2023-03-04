
export default function Button({ filter, onClick }) {
  return (
    <button onClick={() => onClick(filter)}>{filter}</button>
  );
}
