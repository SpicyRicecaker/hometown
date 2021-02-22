export const scrollable = (node: any, currentViewport: number) => {
  let lastKnownScrollPosition = 0;
  let ticking = false;
  let sensitivity = 200;

  const handleScroll = (lastKnownScrollPosition) => {
    if (
      Math.abs(lastKnownScrollPosition - currentViewport * window.innerHeight) +
        sensitivity <
      window.innerHeight
    ) {
      console.log(
        Math.abs(
          lastKnownScrollPosition - currentViewport * window.innerHeight
        ),
        window.innerHeight
      );
      return;
    }

    // scrollup = newscrolly - scrolly > 0
    if (lastKnownScrollPosition - currentViewport * window.innerHeight > 0) {
      node.dispatchEvent(new CustomEvent('scrollup'));
    }
    // scrolldown = newscrolly - scrolly < 0
    else {
      node.dispatchEvent(new CustomEvent('scrolldown'));
    }
  };

  const throttleScroll = () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  };

  node.addEventListener('wheel', throttleScroll);

  return {
    update(newCurrentViewport: number) {
      currentViewport = newCurrentViewport;
    },
    destroy() {
      node.removeEventListener('wheel', handleScroll);
    },
  };
};
