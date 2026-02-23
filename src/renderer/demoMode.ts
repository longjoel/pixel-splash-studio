export const isBrowserDemo = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return (window as typeof window & { __PSS_BROWSER_DEMO__?: boolean }).__PSS_BROWSER_DEMO__ === true;
};
