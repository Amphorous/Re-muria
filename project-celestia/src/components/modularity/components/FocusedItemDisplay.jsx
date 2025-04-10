// components/FocusedItemDisplay.jsx
export default function FocusedItemDisplay({ item, onNext }) {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-center p-8 bg-gray-800 rounded-xl shadow-2xl">
      <div className="text-4xl font-bold">{item.title}</div>
      <div className="text-xl text-gray-400 mt-2">{item.artist}</div>
      <button
        onClick={onNext}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
      >
        Next Song
      </button>
    </div>
  );
}
