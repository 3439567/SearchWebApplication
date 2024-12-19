import React, { useState, useEffect } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data.Search || data);
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setIsError({
        show: true,
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Debouncing process
  useEffect(() => {
    const timeout = setTimeout(() => {
      getMovie(`${API_URL}&s=${apiParams}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
