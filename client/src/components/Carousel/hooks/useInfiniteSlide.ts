import { useCallback, useEffect, useRef } from 'react';
import { isNotNone } from '../../../utils/typeGuard';

type TimerCallback = () => void;

type UseInfiniteSlide = [(callback: TimerCallback, ms: number) => void, () => void];

const useInfiniteSlide = (): UseInfiniteSlide => {
  const timerId = useRef<NodeJS.Timeout>();

  const handleClear = useCallback(() => {
    if (isNotNone(timerId.current)) {
      clearTimeout(timerId.current);
    }
  }, []);

  const handleRun = useCallback(
    (fn: TimerCallback, ms: number) => {
      handleClear();

      timerId.current = setInterval(() => {
        fn();
      }, ms);
    },
    [handleClear]
  );

  useEffect(() => {
    return handleClear;
  }, [handleClear]);

  return [handleRun, handleClear];
};

export default useInfiniteSlide;
