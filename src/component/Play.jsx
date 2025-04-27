import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import "../css/VideoPlayer.css";

const initialComments = [
  { id: 1, name: "Chisato", text: "Waaah, that movie was like an emotional rollercoaster! I wanna watch it again with extra-large popcorn!", date: "2025-04-20" },
  { id: 2, name: "Takina", text: "I don't understand why everyone cried... but the final scene was pretty satisfying.", date: "2025-04-21" },

];

const VideoPlayer = () => {
  const { state } = useLocation(); 
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);

    };

    fetchRecommendations();
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      name: currentUser.username || "Guest",
      text: newComment,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="container my-4 bg-dark text-light p-4 rounded">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <h1 className="text-center text-white mb-4">{state?.item?.Title}</h1> {/* Mostrar el nombre de la película */}
          <div className="ratio ratio-16x9 mb-3">
            <video controls>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Sección de comentarios */}
          <div className="comments">
            <h5>Comments</h5>
            <div className="mb-3">
              <textarea
                className="form-control bg-secondary text-light"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button className="btn btn-primary mt-2" onClick={handleAddComment}>
                Comment
              </button>
            </div>

            {/* Listado de comentarios */}
            <div className="comments-dropdown">
              <div className="overflow-auto" style={{ maxHeight: "200px" }}>
                {comments.map((comment) => (
                  <div key={comment.id} className="border-bottom border-secondary pb-2 mb-2 text-start">
                    <strong className="comment-name">{comment.name}</strong> <small className="text-muted">{comment.date}</small>
                    <p className="mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 recomended-pc">
          {/* Sección de recomendaciones */}
          {loading ? (
            <p>Loading...</p>
          ) : recommendations.length === 0 ? (
            <p>No recommendations available.</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-center">
              {recommendations.map((rec) => (
                <div key={rec.imdbID} className="d-flex flex-column align-items-center mb-3 movie-card p-2 border border-secondary rounded bg-secondary text-light mx-2">
                  <img src={rec.Poster} alt={rec.Title} className="mb-2" style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "6px" }} />
                  <p className="fw-bold text-center mt-2">{rec.Title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
