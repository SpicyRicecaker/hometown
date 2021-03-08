// This file calculates powerpoint slide # according to our current scroll position,
// and returns it to `App.svelte` in order for it to update the dot respective to the powerpoint #
// 
// Keep in mind that scroll position affects => powerpoint #, but *not* the other way around
// in other words, this file is only a tracker, for the purposes of updating the powerpoint # metric.
// Having both values tied to each other was just too buggy for me lol
//
// Takes in some HTMLElement and the `currentViewport`, which is what powerpoint slide we're on
export const scrollable = (node: any, currentViewport: number) => {
  // Store the last known scroll position
  let lastKnownScrollPosition = 0;
  // Ticking throttles scroll events so we don't get 1 fps
  let ticking = false;

  // This function is in charge of returning a new powerpoint slide # depending on the amount we've scrolled
  const handleScroll = (lastKnownScrollPosition) => {
    // Our total height scrolled / height of each powerpoint slide
    const newCurrentViewport = Math.round(
      lastKnownScrollPosition / window.innerHeight
    );
    // If the viewpoints are the same ignore
    if (newCurrentViewport === currentViewport) {
      return;
    }

    // Otherwise, dispatch a scroll event, along with the number of the new powerpoint slide
    node.dispatchEvent(
      new CustomEvent('scrollchange', {
        detail: { newCurrentViewport },
      })
    );
  };

  // In the case of a scroll event...
  //
  // Function referenced from https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
  const throttleScroll = (e: UIEvent) => {
    // Update our last known scroll position
    lastKnownScrollPosition = window.scrollY;

    // If we're not handling any ticking events
    if (!ticking) {
      // Setup a request animation frame loop 
      window.requestAnimationFrame(() => {
        // Handle the scroll
        handleScroll(lastKnownScrollPosition);
        // Then after it's handled reopen the event window
        ticking = false;
      });

      // Lock the event window
      ticking = true;
    }
  };

  // When we detect the user scrolling, throttle it first, then handle it
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
