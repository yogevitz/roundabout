export const includes = (val, arr) =>
  arr.includes
    ? arr.includes(val)
    : !!arr.filter((item) => item === val).length;

const wrapAroundValue = (val, max) => ((val % max) + max) % max;

const hardBoundedValue = (val, max) => Math.max(0, Math.min(max, val));

export const normalizeIndex = (idx, len, wrap = false) =>
  wrap ? wrapAroundValue(idx, len) : hardBoundedValue(idx, len - 1);

export const values =
  Object.values || ((obj) => Object.keys(obj).map((key) => obj[key]));

export const nop = () => {};

export const easeOutQuint = (t) => {
  let n = t;
  return 1 + --n * n ** 4;
};

const fakeChild = { getBoundingClientRect: () => ({}) };
export const isWhollyInView = (parent) => (child = fakeChild) => {
  const { left: cLeft, right: cRight } = child.getBoundingClientRect();
  const { left: pLeft, right: pRight } = parent.getBoundingClientRect();
  return cLeft >= pLeft && cRight <= pRight;
};

export const animate = (
  el,
  {
    delta = 0,
    immediate = false,
    duration = 500,
    easing = easeOutQuint,
    prop = 'scrollTop',
  } = {},
) =>
  new Promise((res) => {
    if (!delta) {
      return res();
    }
    const initialVal = el[prop];
    if (immediate) {
      el[prop] = initialVal + delta;
      return res();
    }
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progressTime = timestamp - startTime;
      const progressRatio = easing(progressTime / duration);
      el[prop] = initialVal + delta * progressRatio;
      if (progressTime < duration) {
        window.requestAnimationFrame(step);
      } else {
        el[prop] = initialVal + delta;
        res();
      }
    };
    window.requestAnimationFrame(step);
  });
