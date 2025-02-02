import React, { useState, useEffect } from "react";
import { fetchRecentlyPlayedSongs } from "../script.jsx";
import { useNavigate } from "react-router-dom";

function Rate() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function getRecentlyPlayedSongs() {
      try {
        const songs = await fetchRecentlyPlayedSongs();
        const songsSet = new Set(songs);
        const songArray = [];
        for (let i = 0; i < songs.length; i++) {
          console.log(songs[i]);
          let song = [
            songs[i].name,
            songs[i].artists[0].name,
            songs[i].album.images[1].url,
          ];
          songArray.push(song);
        }
        //const songsSet = new Set(songs); // this won't work cuz they aren't exact copies (diff listen timez)
        const arrayNoDupe = Array.from(songsSet);
        console.log(songArray);
        setRecentlyPlayed(songArray);
      } catch (error) {
        console.error("Error fetching recently played songs:", error);
      }
    }

    getRecentlyPlayedSongs();
  }, []);

  const handleSelect = (index) => {
    debugger;
    console.log("selected");
    console.log(index);
    setSelectedIndex(index);
    setSelected(true);
  };

  const submitForm = (event) => {
    debugger;
    event.preventDefault();
    const review = document.getElementById("reviewBox");
    console.log("Review:", review.value);
    sendReviewToBackend(localStorage.getItem("profile_id"), review.value);
    review.value = "";
  };

  async function sendReviewToBackend(profileId, review) {
    const response = await fetch("http://localhost:5000/add-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: profileId,
        review: review,
        song: recentlyPlayed[selectedIndex][0],
        artist: recentlyPlayed[selectedIndex][1],
        name: localStorage.getItem("name"),
        rating: null,
      }),
    });

    if (response.ok) {
      console.log("Profile ID sent successfully");
    } else {
      console.error("Failed to send review");
      console.log(review);
      console.log(recentlyPlayed[selectedIndex][0]);
      console.log(recentlyPlayed[selectedIndex][1]);
      console.log(localStorage.getItem("name"));
    }
  }
  const navigate = useNavigate();

  const back = () => {
    navigate("/home");
  };

  return (
    <div id="songlist_and_rate">
      <div id="rate">
        <button className="button" onClick={back}>
          back
        </button>
        {selected ? (
          <div>
            <img src={recentlyPlayed[selectedIndex][2]}></img>
            <p className="review">{recentlyPlayed[selectedIndex][0]}</p>
            <p className="review">{recentlyPlayed[selectedIndex][1]}</p>

            <form onSubmit={submitForm}>
              <textarea
                type="text"
                placeholder="enter review"
                name="review"
                id="reviewBox"
              />
              <input type="submit" id="submit_btn" value="submit" />
            </form>
          </div>
        ) : (
          <div>
            <p id="pleaseselect">select a song to review</p>
          </div>
        )}
      </div>
      <ul id="songlist">
        {recentlyPlayed.map((song, index) => (
          <li
            className="recentsongs"
            key={index}
            onClick={() => handleSelect(index)}
          >
            <p className="recentsongs">
              {song[0]} by {song[1]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rate;
