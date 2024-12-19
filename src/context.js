import React, { useContext, useEffect, useState } from "react";

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

// Creating Context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("titanic");

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.Response === "True") {
        setMovie(data.Search);
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
      setIsError({
        show: true,
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 500);

    //timeout
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isError,
        movie,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
