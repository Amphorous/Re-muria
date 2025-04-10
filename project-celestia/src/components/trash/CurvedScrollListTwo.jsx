import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function CurvedScrollListTwo({
  items = [],
  initialFocus = 0,
  scrollMidpoint = 0.55,
  scrollStart = 0,
  itemSpacing = 85
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const scrollY = useMotionValue(0);
  const [rawIndex, setRawIndex] = useState(initialFocus % items.length);
  const [focusedIndex, setFocusedIndex] = useState(rawIndex);
  const debounceTimeout = useRef(null);

  const ITEM_HEIGHT = itemSpacing;
  const screenHeight = window.innerHeight;
  const startY = screenHeight * scrollStart;
  const midpoint = screenHeight * scrollMidpoint;
  const VIEWPORT_HEIGHT = (midpoint - startY) * 2;
  const endY = startY + VIEWPORT_HEIGHT;
  const PADDING = VIEWPORT_HEIGHT / 2 - ITEM_HEIGHT / 2;

  const scrollToIndex = (index) => {
    const target = index * ITEM_HEIGHT;
    animate(scrollY, target, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      onUpdate: (v) => {
        if (containerRef.current) {
          containerRef.current.scrollTop = v;
        }
      },
      onComplete: () => {
        setRawIndex(index % items.length);
        setFocusedIndex(index % items.length);
      }
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = rawIndex * ITEM_HEIGHT;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = containerRef.current.scrollTop;
      scrollY.set(current);
      const index = Math.round(current / ITEM_HEIGHT) % items.length;
      setRawIndex(index);

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        setFocusedIndex(index);
      }, 200); // adjust debounce time as needed
    };

    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNext = () => {
    const nextIndex = (focusedIndex + 1) % items.length;
    scrollToIndex(nextIndex);
  };

  return (
    <div
      className="h-screen w-screen flex items-start bg-gray-900 relative"
      style={{ paddingTop: `${startY}px`, paddingBottom: `${screenHeight - endY}px` }}
    >
      <motion.div
        ref={containerRef}
        className="relative overflow-y-scroll scrollbar-none -ml-[5%]"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDrag={(event, info) => {
          const ref = containerRef.current;
          if (ref) {
            ref.scrollTop -= info.delta.y;
          }
        }}
        style={{
          width: '320px',
          height: `${VIEWPORT_HEIGHT}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div
          className="relative"
          style={{ height: `${items.length * ITEM_HEIGHT + PADDING * 2}px` }}
        >
          <div style={{ height: `${PADDING}px` }} />
          {items.map((item, index) => {
            const itemY = index * ITEM_HEIGHT;
            const offset = useTransform(scrollY, (v) => (itemY + PADDING - v - VIEWPORT_HEIGHT / 2 + ITEM_HEIGHT / 2) / ITEM_HEIGHT);
            const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o) * 0.1, 0.4));
            const opacity = useTransform(offset, (o) => 1 - Math.min(Math.abs(o) * 0.3, 0.7));

            return (
              <motion.div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className="absolute left-0 w-80 rounded-xl p-5 text-white shadow-lg bg-gray-800 text-right"
                style={{
                  top: index * ITEM_HEIGHT + PADDING,
                  scale,
                  opacity,
                  zIndex: 100 - Math.abs(index - rawIndex)
                }}
              >
                <div className="text-2xl font-semibold">{item.title}</div>
                <div className="text-md text-gray-400">{item.artist}</div>
              </motion.div>
            );
          })}
          <div style={{ height: `${PADDING}px` }} />
        </div>
      </motion.div>

      {focusedIndex !== null && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-center p-8 bg-gray-800 rounded-xl shadow-2xl">
          <div className="text-4xl font-bold">{items[focusedIndex].title}</div>
          <div className="text-xl text-gray-400 mt-2">{items[focusedIndex].artist}</div>
          <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
          >
            Next Song
          </button>
        </div>
      )}
    </div>
  );
}
