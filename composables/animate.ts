import { Ref } from "vue";
import { gsap } from "gsap";

interface GsapOptions {
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  repeat?: number;
}

export function useAnimate() {
  const animateElement = (
    el: Element | Ref<HTMLElement | null>,
    options: GsapOptions
  ) => {
    gsap.to(el instanceof HTMLElement ? el : el.value, options);
  };

  const fadeIn = (
    el: Element | Ref<HTMLElement | null>,
    duration: number = 1,
    delay: number = 0
  ) => {
    gsap.fromTo(
      el instanceof HTMLElement ? el : el.value,
      { opacity: 0 },
      { opacity: 1, duration, delay }
    );
  };

  const fadeOut = (
    el: Element | Ref<HTMLElement | null>,
    duration: number = 1,
    delay: number = 0
  ) => {
    gsap.fromTo(
      el instanceof HTMLElement ? el : el.value,
      { opacity: 1 },
      { opacity: 0, duration, delay }
    );
  };

  const scaleUp = (
    el: Element | Ref<HTMLElement | null>,
    duration: number = 1.5,
    scale: number = 1.5
  ) => {
    gsap.to(el instanceof HTMLElement ? el : el.value, {
      scale,
      duration,
      ease: "power4.out",
    });
  };

  const scaleDown = (
    el: Element | Ref<HTMLElement | null>,
    duration: number = 1.5,
    scale: number = 1
  ) => {
    gsap.to(el instanceof HTMLElement ? el : el.value, {
      scale,
      duration,
      ease: "power4.inOut",
    });
  };

  const animateLoadingScreen = (
    loadingScreen: Ref<HTMLElement | null>,
    loadingLogo: string,
    onComplete: () => void
  ) => {
    gsap
      .timeline()
      .fromTo(
        loadingLogo,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.5, duration: 1.5, ease: "power4.inOut" }
      )
      .to(loadingLogo, {
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
      })
      .to(loadingScreen.value, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: onComplete,
      });
  };

  const animateContent = (
    content: Ref<HTMLElement | null>,
    delay: number = 0.5
  ) => {
    gsap.fromTo(
      content.value,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out", delay }
    );
  };

  const animateScrollWheel = (scrollWheelClass: string) => {
    gsap.fromTo(
      scrollWheelClass,
      { y: 0, opacity: 1 },
      {
        y: 10,
        opacity: 0,
        repeat: -1,
        duration: 1,
        ease: "power2.inOut",
      }
    );
  };

  return {
    animateElement,
    fadeIn,
    fadeOut,
    scaleUp,
    scaleDown,
    animateLoadingScreen,
    animateContent,
    animateScrollWheel,
  };
}
