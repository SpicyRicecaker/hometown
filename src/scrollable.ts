export const scrollable = (node: any, currentViewport: number) => {
  let lastKnownScrollPosition = 0;
  let ticking = false;

  const handleScroll = (lastKnownScrollPosition) => {
    const newCurrentViewport =
      Math.round(lastKnownScrollPosition / window.innerHeight)
    ;
    if (newCurrentViewport === currentViewport) {
      return;
    }

    // scrollup = newscrolly - scrolly > 0
    node.dispatchEvent(
      new CustomEvent('scrollchange', {
        detail: { newCurrentViewport },
      })
    );
  };

  const throttleScroll = (e: UIEvent) => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  };

  node.addEventListener('scroll', throttleScroll);

  return {
    update(newCurrentViewport: number) {
      currentViewport = newCurrentViewport;
    },
    destroy() {
      node.removeEventListener('scroll', handleScroll);
    },
  };
};
