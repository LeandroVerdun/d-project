import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; 
import "../css/VideoPlayer.css";

const initialComments = [
  { id: 1, name: "Chisato", text: "Waaah, that movie was like an emotional rollercoaster! I wanna watch it again with extra-large popcorn!", date: "2025-04-20" },
  { id: 2, name: "Takina", text: "I don't understand why everyone cried... but the final scene was pretty satisfying.", date: "2025-04-21" },
  { id: 3, name: "Chisato", text: "I can't stop thinking about that scene! It was so intense and exciting! Maybe I need to get some action movies for my next binge.", date: "2025-04-22" },
  { id: 4, name: "Takina", text: "I'm still trying to process everything that happened, but I have to admit, the action was top-notch. I wanna know what happens next!", date: "2025-04-23" },
  { id: 5, name: "Mika", text: "That plot twist got me good! I never expected that. I’m glad I stayed until the very end!", date: "2025-04-24" },
  { id: 6, name: "Fuki", text: "Even though it was a bit sad at times, it had an incredible vibe. The action scenes were just what I needed!", date: "2025-04-25" },
  { id: 7, name: "Chisato", text: "When they fought together, that was pure magic. I loved seeing their bond grow throughout the movie.", date: "2025-04-26" },
  { id: 8, name: "Takina", text: "Definitely not my usual choice, but I can’t deny that it was a fantastic watch. I might just have to watch more like this.", date: "2025-04-27" },
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

      const recommendedMovies = [
        { imdbID: "tt2911666", Title: "John Wick", Poster: "https://es.web.img3.acsta.net/pictures/14/10/01/14/18/135831.jpg" },
        { imdbID: "tt0298148", Title: "Shrek 2", Poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWmgLUQB7gL5sr-pQCNIZulvxsvGG2F-2SEw&s" },
        { imdbID: "tt9362726", Title: "Spider-Man: No Way Home", Poster: "https://es.web.img2.acsta.net/pictures/21/12/01/12/07/0243323.jpg" },
        { imdbID: "tt4154796", Title: "Avengers: Endgame", Poster: "https://es.web.img2.acsta.net/pictures/19/03/26/17/22/0896830.jpg" },
        { imdbID: "tt0452030", Title: "Resident Evil: Extinction", Poster: "https://es.web.img3.acsta.net/medias/nmedia/18/69/52/49/20051655.jpg" }
      ];

      console.log("Recommended Movies:", recommendedMovies); 

      setRecommendations(recommendedMovies);
      setLoading(false);
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
          <h1 className="text-center text-white mb-4">{state?.item?.Title}</h1> 
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
            <div className="d-flex flex-column justify-content-start">
              {recommendations.map((rec) => {
                console.log("Rendering movie:", rec.Title);  
                return (
                  <Link
                    key={rec.imdbID}
                    to={`/descripcion/${rec.imdbID}`} 
                    className="d-flex flex-column align-items-center mb-3 movie-card p-2 border border-secondary rounded bg-secondary text-light mx-2"
                  >
                    <img
                      src={rec.Poster}
                      alt={rec.Title}
                      className="mb-2"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <p className="fw-bold text-center mt-2">{rec.Title}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
