// components/ScrollItem.jsx
import { motion, useTransform } from 'framer-motion';

export default function ScrollItem({ item, index, itemY, padding, viewHeight, scrollY, rawIndex, itemHeight, onClick }) {
  const offset = useTransform(scrollY, (v) => (itemY + padding - v - viewHeight / 2 + itemHeight / 2) / itemHeight);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o) * 0.1, 0.4));
  const opacity = useTransform(offset, (o) => 1 - Math.min(Math.abs(o) * 0.3, 0.7));

  return (
    <motion.div
      className=" absolute left-0 w-96 h-28 rounded-xl p-6 text-white shadow-lg bg-gray-800 text-right cursor-pointer"
      style={{
        top: itemY + padding,
        scale,
        opacity,
        zIndex: 100 - Math.abs(index - rawIndex)
      }}
      onClick={() => onClick(index)}
    >
      <div className="text-2xl font-semibold">{item.title}</div>
      <div className="text-md text-gray-400">{item.artist}</div>
    </motion.div>
  );
}
