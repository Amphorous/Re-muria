// CurvedScrollListModular.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate, useAnimationFrame } from 'framer-motion';
import useScrollSync from './hooks/useScrollSync';
import ScrollItem from './components/ScrollItem';
import FocusedItemDisplay from './components/FocusedItemDisplay';

export default function CurvedScrollListModular({
  items = [],
  initialFocus = 0,
  scrollMidpoint = 0.55,
  scrollStart = 0,
  itemSpacing = 100,
  dragSensitivity = 0.2,
  inertiaDecay = 0.9,
  inertiaMultiplier = 10,
  springStiffness = 300,
  springDamping = 30
}) {

  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  const velocity = useRef(0);
  const [rawIndex, setRawIndex] = useState(initialFocus % items.length);
  const [focusedIndex, setFocusedIndex] = useState(rawIndex);

  const ITEM_HEIGHT = itemSpacing;
  const screenHeight = window.innerHeight;
  const startY = screenHeight * scrollStart;
  const midpoint = screenHeight * scrollMidpoint;
  const VIEWPORT_HEIGHT = (midpoint - startY) * 2;
  const PADDING = VIEWPORT_HEIGHT / 2 - ITEM_HEIGHT / 2;

  const scrollToIndex = (index) => {
    const target = index * ITEM_HEIGHT;
    animate(scrollY, target, {
      type: 'spring',
      stiffness: springStiffness,
      damping: springDamping,
      onUpdate: (v) => {
        if (containerRef.current) {
          containerRef.current.scrollTop = v;
        }
      },
      onComplete: () => {
        const newIndex = index % items.length;
        setRawIndex(newIndex);
        setFocusedIndex(newIndex);
      }
    });
  };

  useEffect(() => {
    if (items.length > 0) {
      const index = initialFocus % items.length;
      setRawIndex(index);
      setFocusedIndex(index);
      if (containerRef.current) {
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
        scrollY.set(index * ITEM_HEIGHT);
      }
    }
  }, [items]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = rawIndex * ITEM_HEIGHT;
    }
  }, []);

  useScrollSync(containerRef, ITEM_HEIGHT, items.length, scrollY, setRawIndex, setFocusedIndex);

  const handleNext = () => {
    scrollToIndex((focusedIndex + 1) % items.length);
  };

  const handleClickItem = (index) => {
    scrollToIndex(index);
  };

  useAnimationFrame((t, delta) => {
    if (Math.abs(velocity.current) > 0.05) {
      if (containerRef.current) {
        containerRef.current.scrollTop += velocity.current * (delta / inertiaMultiplier);
        scrollY.set(containerRef.current.scrollTop);
      }
      velocity.current *= inertiaDecay;
    }
  });

  return (
    <div
      className="h-[95%] w-full flex items-start relative"
      style={{ paddingTop: `${startY}px`, paddingBottom: `${screenHeight - (startY + VIEWPORT_HEIGHT)}px` }}
    >
      <motion.div
        ref={containerRef}
        className="relative overflow-y-scroll scrollbar-none -ml-[5rem]"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDrag={(event, info) => {
          if (containerRef.current) {
            containerRef.current.scrollTop -= info.delta.y * dragSensitivity;
            scrollY.set(containerRef.current.scrollTop);
            velocity.current = -info.velocity.y / inertiaMultiplier;
          }
        }}
        style={{
          width: '384px',
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
          {items.map((item, index) => (
            <ScrollItem
              key={index}
              item={item}
              index={index}
              itemY={index * ITEM_HEIGHT}
              padding={PADDING}
              viewHeight={VIEWPORT_HEIGHT}
              scrollY={scrollY}
              rawIndex={rawIndex}
              itemHeight={ITEM_HEIGHT}
              onClick={handleClickItem}
            />
          ))}
          <div style={{ height: `${PADDING}px` }} />
        </div>
      </motion.div>

      {(focusedIndex !== NaN && items[focusedIndex] !== undefined) && (
        <div>
          <FocusedItemDisplay item={items[focusedIndex]} onNext={handleNext} />
        </div>
      )}
    </div>
  );
}
