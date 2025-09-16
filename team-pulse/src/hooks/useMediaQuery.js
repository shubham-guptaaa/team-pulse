import { useState, useEffect } from "react";

/**
 * A custom hook that tracks the state of a CSS media query.
 * @param {string} query - The media query string to watch.
 * @returns {boolean} - True if the media query matches, false otherwise.
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;