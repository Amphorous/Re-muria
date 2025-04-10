import React, { useRef, useState, useEffect } from 'react';

export default function CurvedScrollList({ items = [], initialFocus = 0, scrollMidpoint = 0.55, scrollStart = 0, itemSpacing = 85 }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(initialFocus);
  const snapTimeout = useRef(null);
  const isSnapping = useRef(false);

  const ITEM_HEIGHT = itemSpacing;
  const screenHeight = window.innerHeight;
  const startY = screenHeight * scrollStart;
  const midpoint = screenHeight * scrollMidpoint;
  const VIEWPORT_HEIGHT = (midpoint - startY) * 2;
  const endY = startY + VIEWPORT_HEIGHT;
  const PADDING = VIEWPORT_HEIGHT / 2 - ITEM_HEIGHT / 2;

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const targetScroll = index * ITEM_HEIGHT;
      isSnapping.current = true;
      containerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setFocusedIndex(index);
      setTimeout(() => {
        isSnapping.current = false;
      }, 300);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      const normalizedIndex = initialFocus % items.length;
      scrollToIndex(normalizedIndex);
    }
  }, [initialFocus, items.length]);

  const handleScroll = () => {
    if (!containerRef.current || isSnapping.current) return;

    const currentScroll = containerRef.current.scrollTop;
    setScrollTop(currentScroll);

    if (snapTimeout.current) clearTimeout(snapTimeout.current);

    snapTimeout.current = setTimeout(() => {
      if (!containerRef.current) return;

      const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const clampedScroll = Math.min(Math.max(currentScroll, 0), maxScroll);
      const index = Math.round(clampedScroll / ITEM_HEIGHT);
      const targetScroll = index * ITEM_HEIGHT;

      isSnapping.current = true;
      containerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setFocusedIndex(index);

      setTimeout(() => {
        isSnapping.current = false;
      }, 300);
    }, 150);
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
    };
  }, []);

  const handleNext = () => {
    const nextIndex = (focusedIndex + 1) % items.length;
    scrollToIndex(nextIndex);
  };

  return (
    <div className="h-screen w-screen flex items-start bg-gray-900 relative" style={{ paddingTop: `${startY}px`, paddingBottom: `${screenHeight - endY}px` }}>
      <div
        ref={containerRef}
        className="relative overflow-y-scroll scrollbar-none -ml-[5%]"
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
            const offset = (itemY + PADDING - scrollTop - VIEWPORT_HEIGHT / 2 + ITEM_HEIGHT / 2) / ITEM_HEIGHT;

            const scale = 1 - Math.min(Math.abs(offset) * 0.1, 0.4);
            const opacity = 1 - Math.min(Math.abs(offset) * 0.3, 0.7);

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className="absolute left-0 w-80 rounded-xl p-5 text-white shadow-lg bg-gray-800 text-right"
                style={{
                  top: index * ITEM_HEIGHT + PADDING,
                  transform: `scale(${scale})`,
                  opacity,
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  zIndex: 100 - Math.abs(offset),
                }}
              >
                <div className="text-2xl font-semibold">{item.title}</div>
                <div className="text-md text-gray-400">{item.artist}</div>
              </div>
            );
          })}
          <div style={{ height: `${PADDING}px` }} />
        </div>
      </div>

      {focusedIndex !== null && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-center p-8 bg-gray-800 rounded-xl shadow-2xl">
          <div className="text-4xl font-bold">{items[focusedIndex].title}</div>
          <div className="text-xl text-gray-400 mt-2">{items[focusedIndex].artist}</div>
          <button onClick={handleNext} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">Next Song</button>
        </div>
      )}
    </div>
  );
}
