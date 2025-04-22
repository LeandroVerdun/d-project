import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/VideoPlayer.css";

const initialComments = [
  { id: 1, name: "Alice", text: "Great video!", date: "2025-04-20" },
  { id: 2, name: "Bob", text: "This was so fun to watch!", date: "2025-04-21" },
];

const VideoPlayer = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  // Obtener el nombre del usuario desde el localStorage
  const currentUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };  // Asegurarse de que siempre haya un valor

  const movieTitles = [
    "John Wick",
    "Shrek 2",
    "Spider-Man: No Way Home",
    "Avengers: Endgame",
  ];

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);

      try {
        const moviePromises = movieTitles.map((title) =>
          fetch(`https://www.omdbapi.com/?apikey=d511530c&s=${title}&type=movie`)
            .then((res) => res.json())
            .then((data) => {
              if (data.Response === "True" && data.Search && data.Search.length > 0) {
                return data.Search[0]; // Solo tomar el primer resultado
              }
              return null;
            })
        );

        const movies = await Promise.all(moviePromises);
        setRecommendations(movies.filter((movie) => movie !== null));
      } catch (error) {
        console.error("Error fetching movies:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      name: currentUser.username || "Guest",  // Usar el nombre del usuario desde el objeto "currentUser"
      text: newComment,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleMovieClick = () => {
    navigate("/404");  // Esto redirige a una página 404
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="ratio ratio-16x9 mb-3">
            <video controls>
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="comments">
            <h5>Comments</h5>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button className="btn btn-primary mt-2" onClick={handleAddComment}>
                Comment
              </button>
            </div>
            {comments.map((comment) => (
              <div key={comment.id} className="border-bottom pb-2 mb-2">
                <strong>{comment.name}</strong>{" "}
                <small className="text-muted">{comment.date}</small>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <h5>Recommended</h5>
          {loading ? (
            <p>Loading...</p>
          ) : recommendations.length === 0 ? (
            <p>No recommendations available.</p>
          ) : (
            recommendations.map((rec) => (
              <div
                key={rec.imdbID}
                className="d-flex mb-3 movie-card p-2 border rounded"
                onClick={handleMovieClick}
              >
                <img
                  src={rec.Poster}
                  alt={rec.Title}
                  className="me-2"
                  style={{
                    width: "120px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div>
                  <p className="mb-0 fw-bold">{rec.Title}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
