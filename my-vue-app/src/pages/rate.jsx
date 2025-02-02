import React from "react";
import {fetchRecentlyPlayedSongs} from '../script.jsx'
function Rate() {

    // this is where function to make api call for list would go ?
    // then can use the list as needed below
    fetchRecentlyPlayedSongs()
    return(
        <div id="songlist_and_rate">
            <div id="songlist"></div>
            <div id="rate"></div>
        </div>
    );
};

export default Rate;