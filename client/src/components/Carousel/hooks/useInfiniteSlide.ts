import { useEffect } from 'react';
import { isNone, isNotNone } from '../../../utils/typeGuard';

type GenerateUseInfiniteSlide<S> = {
  (state: S, fn: () => void, time: number): void;
};

const generateUseInfiniteSlide = <S>(): GenerateUseInfiniteSlide<S> => {
  let rafId: number | null = null;
  let beforeTime: number | null = null;

  const generateRafCallbackFunction = (fn: () => void, time: number) => {
    const interval = (timestamp: number) => {
      if (isNone(beforeTime)) {
        beforeTime = timestamp;
        rafId = window.requestAnimationFrame(interval);
        return;
      }

      if (timestamp - beforeTime > time) {
        beforeTime = timestamp;
        fn();
      }
      rafId = window.requestAnimationFrame(interval);
    };

    return interval;
  };

  const useInfiniteSlide = <S>(state: S, fn: () => void, time: number): void => {
    const rafCallbackFunction = generateRafCallbackFunction(fn, time);
    useEffect(() => {
      rafId = window.requestAnimationFrame(rafCallbackFunction);
      return () => {
        if (isNotNone(rafId)) {
          window.cancelAnimationFrame(rafId);
        }
      };
    }, [state, rafCallbackFunction]);
  };

  return useInfiniteSlide;
};

export default generateUseInfiniteSlide;
