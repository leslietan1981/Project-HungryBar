import { keyframes } from "@emotion/react";
import type { SxProps } from "@mui/material/styles";
import type { TransitionStatus } from "react-transition-group";

type SlideDirection = "up" | "down" | "left" | "right";
type CSSKeywordEasing = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

interface AnimOptionProps {
  delay?: number;
  easing?: CSSKeywordEasing;
}

export const animFadeAndSlideIn = (
  direction: SlideDirection,
  distance: number | string,
  duration: number,
  options?: AnimOptionProps,
) => {
  const translateAxis: string = direction === "up" || direction === "down" ? "translateY" : "translateX";
  const strDistance: string = typeof distance === "number" ? `${distance}px` : distance;
  const startPosition: string = (direction === "down" || direction === "right" ? "-" : "") + strDistance;
  const { delay = 0, easing = "ease-out" } = options ?? {};
  const keyf = keyframes`
    from { opacity: 0; transform: ${translateAxis}(${startPosition}); }
    to { opacity: 1; transform: ${translateAxis}(0); }`;
  const animSx: SxProps = {
    opacity: 0,
    animation: `${keyf} ${duration}ms ${easing} forwards`,
    ...(delay > 0 && { animationDelay: `${delay}ms` }),
  };

  return animSx;
};

export const createExitFadeStyles = (duration: number) => {
  const styles = {
    unmounted: {},
    entering: { opacity: 1, transition: "none" },
    entered: { opacity: 1, transition: "none" },
    exiting: {
      opacity: 0,
      transition: `opacity ${duration}ms ease`,
    },
    exited: {
      opacity: 0,
      transition: `opacity ${duration}ms ease`,
    },
  } satisfies Record<TransitionStatus, React.CSSProperties>;

  return styles;
};

export const createExitFadeAndSlideStyles = (direction: SlideDirection, distance: number, duration: number) => {
  const translateAxis: string = direction === "up" || direction === "down" ? "translateY" : "translateX";
  const endPosition: number = distance * (direction === "down" || direction === "right" ? 1 : -1);
  const styles = {
    unmounted: {},
    entering: { transform: `${translateAxis}(0px)`, opacity: 1, transition: "none" },
    entered: { transform: `${translateAxis}(0px)`, opacity: 1, transition: "none" },
    exiting: {
      transform: `${translateAxis}(${endPosition}px)`,
      opacity: 0,
      transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
    },
    exited: {
      transform: `${translateAxis}(${endPosition}px)`,
      opacity: 0,
      transition: `transform ${duration}ms ease, opacity ${duration}ms ease`,
    },
  } satisfies Record<TransitionStatus, React.CSSProperties>;

  return styles;
};
