import { useState, useRef, useEffect, useCallback } from 'react';

type Callback = () => void;
/**
 * useTimeout 延迟执行函数
 *
 * @param {function} callback 回调函数
 * @param {number} delay 延迟时间
 */
export const useTimeout = (callback: Callback, delay: number) => {
  useEffect(() => {
    let id = setTimeout(callback, delay);
    return () => clearTimeout(id);
  }, [callback, delay]);
};
/**
 * useInterval
 *
 * @param {function} callback 回调函数
 * @param {number} delay 间隔时间
 */
export const useInterval = (callback: Callback, delay: number) => {
  const savedCallback = useRef<Callback>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    let id = setInterval(() => savedCallback.current?.(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

/**
 * useNow 获取当前的时间
 *
 * @returns Date
 */
export function useNow() {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);
  return now;
}
/**
 * useDebounce 实现一个防抖的值
 *
 * @param {any} value 原始值
 * @param {number} delay 延迟时间
 * @returns any
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useTimeout(() => setDebouncedValue(value), delay);
  return debouncedValue;
};

export const useThrottleFn = (fn: Function, delay: number, deps = []) => {
  const { current } = useRef({ fn, id: null });
  useEffect(() => {
    current.fn = fn;
  }, [fn]);
  return useCallback((...args: any[]) => {
    if (!current.id) {
      current.id = setTimeout(() => {
        current.id = null;
      }, delay);
      current.fn(...args);
    }
  }, deps);
};

/**
 * useEffectOnce 在组件中只执行一次的副作用
 *
 * @param {function} fn 回调函数
 */
// export const useEffectOnce = (fn, deps = []) => {
//   const isInitialRender = useRef(true);
//   useEffect(() => {
//     if (isInitialRender.current) {
//       isInitialRender.current = false;
//       return;
//     }
//     fn();
//   }, deps);
// };

/**
 * useOnWindowEvent 注册Window对象事件处理函数
 *
 * @param {string} event Dom事件名称
 * @param {function} handler 时间回调函数
 * @param {Array} deps 依赖数组
 */
export const useOnWindowEvent = (
  event: string,
  handler: EventListener,
  deps = []
) => {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => {
      window.removeEventListener(event, handler);
    };
  }, deps);
};

export const useOnWindowScrollBottom = (callback: Callback, deps = []) => {
  useOnWindowEvent(
    'scroll',
    () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        callback();
      }
    },
    deps
  );
};
