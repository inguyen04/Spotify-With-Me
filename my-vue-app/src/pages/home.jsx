import React from "react";
import "./home.css";

function Home() {

    return (
        <main>
            <h1>Display your Spotify profile data</h1>
            <div className="home-page">
                <div className="left-col">
                    <h2>Feed!!!!</h2>
                    <p>This is the left column content.</p>
                </div>
                <div className="right-col">
                    <h2>Right Column</h2>
                    <h2>Logged in as <span id="displayName"></span></h2>
                    <span id="avatar"></span>
                    <ul>
                        <li>User ID: <span id="id"></span></li>
                        <li>Email: <span id="email"></span></li>
                        <li>Spotify URI: <a id="uri" href="#"></a></li>
                        <li>Link: <a id="url" href="#"></a></li>
                        <li>Profile Image: <span id="imgUrl"></span></li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default Home;
