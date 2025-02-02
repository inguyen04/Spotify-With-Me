import React from "react";
import { useState, useEffect } from "react";
import { getProfileImage } from "/src/script.jsx";

import "./home.css"

function Home() {
    const handleLogin = () => {
          getProfileImage();
        };

    return (
    <main>
      <head>
        <link rel="stylesheet" href="/home.css"></link>
      </head>
      <body>
      <h1>Display your Spotify profile data</h1>
      
        <section id="profile">
        <h2>Logged in as <span id="displayName"></span></h2>
        <span id="avatar"></span>
        <ul>
            <li>User ID: <span id="id"></span></li>
            <li>Email: <span id="email"></span></li>
            <li>Spotify URI: <a id="uri" href="#"></a></li>
            <li>Link: <a id="url" href="#"></a></li>
            <li>Profile Image: <img src={getProfileImage}/></li>
        </ul>
        </section>
      </body>
    </main>
    );
};

export default Home;