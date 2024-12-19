import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${API_URL}&i=${id}`);
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="error">
        Failed to load movie details. Please try again later.
      </div>
    );
  }

  return (
    <div className="movie-details container" style={{ textAlign: "center" }}>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="movie-poster"
        style={{
          maxWidth: "300px",
          margin: "20px auto",
          display: "block",
          borderRadius: "10px",
        }}
      />

      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>

        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SingleMovie;
