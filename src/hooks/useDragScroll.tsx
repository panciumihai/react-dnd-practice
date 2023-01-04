import { useEffect, useState, useRef, RefObject, useLayoutEffect } from 'react';

export interface ScrollState {
  position: number;
  isScrollAllowed: boolean;
}

const BOUND_HEIGHT = 70;

function getScrollDirection({
  position,
  upperBounds = Infinity,
  lowerBounds = -Infinity,
}: {
  position: number | undefined;
  upperBounds: number | undefined;
  lowerBounds: number | undefined;
}): 'top' | 'bottom' | 'stable' {
  if (position === undefined) {
    return 'stable';
  }
  if (position > lowerBounds - BOUND_HEIGHT) {
    return 'bottom';
  }
  if (position < upperBounds + BOUND_HEIGHT) {
    return 'top';
  }
  return 'stable';
}

export const useScroll = (ref?: RefObject<HTMLElement | null>) => {
  const [config, setConfig] = useState<ScrollState>({
    position: 0,
    isScrollAllowed: false,
  });

  const scrollRAF = useRef<null | any>(null);

  const scrollSpeed = 10;
  const { position, isScrollAllowed } = config;

  const bounds = ref?.current
    ? ref.current.getBoundingClientRect()
    : { top: 0, bottom: window.innerHeight };

  const direction = getScrollDirection({
    position,
    upperBounds: bounds?.top,
    lowerBounds: bounds?.bottom,
  });

  useLayoutEffect(() => {
    if (direction !== 'stable' && isScrollAllowed) {
      scrollRAF.current = requestAnimationFrame(function scroll() {
        if (ref?.current) ref.current.scrollBy(0, scrollSpeed * (direction === 'top' ? -1 : 1));
        else window.scrollBy(0, scrollSpeed * (direction === 'top' ? -1 : 1));
        scrollRAF.current = requestAnimationFrame(scroll);
      });
    }
    return () => {
      if (scrollRAF.current) {
        cancelAnimationFrame(scrollRAF.current);
      }
    };
  }, [isScrollAllowed, direction, scrollSpeed]);

  return { updatePosition: setConfig } as const;
};
