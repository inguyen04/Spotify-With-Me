import React from "react";
import { init } from "/src/script.jsx";
import playlistLogo from "/src/assets/spotify-play.png";

import "./home.css";

function Home() {
  init();
  return (
    <div className="home=page">
      <div className="row">
        <div className="column">
          <div className="left-col">
            <h2>
              Logged in as <span id="displayName"></span>
            </h2>
            <h2 className="feed-title">Latest Music Updates</h2>
            <div className="feed-container">
              <div className="feed-card">Sorry - UMI</div>
              <div className="feed-card">All the way live - Metro Boomin</div>
              <div className="feed-card">Wishful Thinking - Grent Perez</div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="right-col">
            <div className="recommended">
              <h3>Recommended Song of the Day!!</h3>
              <img src="/src/assets/headphones.png" alt="Album Cover"></img>
              <h2>Sorry</h2>
              <p>UMI</p>
              <img src={playlistLogo} alt="Album Cover"></img>

              <a href="spotify-link" target="_blank">
                Listen on Spotify
              </a>
            </div>
            {/* <li>
                    Profile Image: <span id="imgUrl"></span>
                    </li> */}
            <span id="avatar"></span>

            <h>YOOOOOOOOOOOOOOO</h>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
