import CharacterCard from "./CharacterCard";

// components/FocusedItemDisplay.jsx
export default function FocusedItemDisplay({ item, onNext }) {

  return (
    <div className="absolute left-1/2 flex justify-end w-[70%]  h-[80%] ml-[10%]
      transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-center rounded-3xl shadow-xl" >
      <CharacterCard item={item}/>
    </div>
  );
}
