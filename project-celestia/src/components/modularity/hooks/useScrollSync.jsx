// hooks/useScrollSync.js
import { useEffect, useRef } from 'react';

export default function useScrollSync(containerRef, itemHeight, itemsLength, scrollY, setRawIndex, setFocusedIndex) {
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = containerRef.current.scrollTop;
      scrollY.set(current);
      const index = Math.round(current / itemHeight) % itemsLength;
      setRawIndex(index);

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        setFocusedIndex(index);
      }, 200);
    };

    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, [itemHeight, itemsLength, scrollY]);
}
