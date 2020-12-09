import { useSelector } from 'react-redux';

export const useSelectorCreator = (selectorCreator, selectorArgs, equalityFn) => {
  const selector = selectorCreator(...selectorArgs);

  return useSelector(selector, equalityFn);
};
