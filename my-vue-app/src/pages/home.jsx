import React, { useState, useEffect } from "react";
import { init } from "/src/script.jsx";
import playlistLogo from "/src/assets/playlistt.jpg";
import {
  getRandomSongFromBackend,
  getAllReviewsFromBackend,
} from "/src/script.jsx";
import { useNavigate } from "react-router-dom";

import "./home.css";

function Home() {
  const [song, setSong] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const handlePress = () => {
    navigate("/rate");
  };

  // Run `init()` on mount
  //   useEffect(() => {
  //     init();
  //   }, []);

  useEffect(() => {
    async function fetchSong() {
      const randomSong = await getRandomSongFromBackend();
      if (randomSong?.song_name) {
        setSong(randomSong);
      } else {
        setError("No song found.");
      }
    }
    fetchSong();
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      debugger;
      const allreviews = await getAllReviewsFromBackend();
      const reviewArray = [];
      for (let i = 0; i < allreviews.reviews.length; i++) {
        console.log(allreviews.reviews[i]);
        let review = [
          allreviews.reviews[i].song,
          allreviews.reviews[i].artist,
          allreviews.reviews[i].name,
          allreviews.reviews[i].review,
        ];
        reviewArray.push(review);
      }
      setReviews(reviewArray);
      //   if (reviews?.name) {
      //     setReviews(allreviews);
      //   } else {
      //     setError("No reviews found.");
      //   }
    }
    fetchReviews();
    console.log(reviews);
  }, []);

  return (
    <div className="home-page">
      <div className="row">
        <div className="column">
          <div className="left-col">
            <h2>
              Welcome <span id="displayName"></span>
            </h2>
            <h2 className="feed-title">Latest Music Updates</h2>
            <div className="feed-container">
              {reviews.map((review, index) => (
                <li className="reviewinlist" key={index}>
                  <p className="items-in-review">
                    {review[0]} by {review[1]} reviewed by {review[2]}
                  </p>
                  <p>{review[3]}</p>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="right-col">
            <div className="recommended">
              <h3>Recommended Song of the Day!!</h3>
              <img
                src="/src/assets/headphones.png"
                className="img-1"
                alt="Album Cover"
              />
              {song ? (
                <>
                  <h2>{song.song_name}</h2>
                  <p>{song.artist}</p>
                  <img src={playlistLogo} className="img-2" alt="Album Cover" />

                  {song.spotify_url && (
                    <a
                      href={song.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen on Spotify
                    </a>
                  )}
                </>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p>Loading song...</p>
              )}
            </div>
            <span id="avatar"></span>
            <div className="rating-section">
              <h1>
                Track songs you've listened to. <br></br> Tell your friends
                what's good.
              </h1>
              <button className="rating-button" onClick={handlePress}>
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
