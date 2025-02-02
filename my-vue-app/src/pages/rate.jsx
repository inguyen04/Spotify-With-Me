import React, { useState, useEffect } from "react";
import { fetchRecentlyPlayedSongs } from '../script.jsx';

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
                for(let i = 0; i < songs.length; i++){
                    let song = [songs[i].name, songs[i].artists[0].name, songs[i].album.images.url];
                    songArray.push(song);

                }
                //const songsSet = new Set(songs); // this won't work cuz they aren't exact copies (diff listen timez)
                const arrayNoDupe = Array.from(songsSet);
                console.log(songArray);
                setRecentlyPlayed(songArray);
            } catch (error) {
                console.error('Error fetching recently played songs:', error);
            }
        }

        getRecentlyPlayedSongs();
    }, []);

    const handleSelect = (index) => {
        debugger
        console.log('selected');
        console.log(index);
        setSelectedIndex(index);
        setSelected(true);
    }

    const submitForm = (event) => {
        event.preventDefault();
        const review = document.getElementById('review').value;
        console.log('Review:', review);
        sendReviewToBackend(localStorage.getItem("profile_id"), review)
    }

    async function sendReviewToBackend(profileId, review) {
        const response = await fetch('http://localhost:5000/add-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: profileId, 
                review: review, 
                song_title: recentlyPlayed[selectedIndex][0], 
                artist: recentlyPlayed[selectedIndex][1],
                name: localStorage.getItem('name')})
        });
    
        if (response.ok) {
            console.log('Profile ID sent successfully');
        } else {
            console.error('Failed to send Profile ID');
        }
    }

    return (
        <div id="songlist_and_rate">
            <div id="songlist">
                {recentlyPlayed.map((song, index) => (
                    <div key={index} onClick={() => handleSelect(index)}>
                        {song[0]} by {song[1]} index {index}
                    </div> 
                ))}
            </div>
            <div id="rate">
            {selected ? (
                <div>
                    <p>song: {recentlyPlayed[selectedIndex][0]}</p>
                    <p>artist: {recentlyPlayed[selectedIndex][1]}</p>
                    
                <form onSubmit={submitForm}>
                    <input type="text" placeholder="enter review" name="review" id="review"/>
                    <input type="submit" id="submit_btn" value="submit"/>
                </form>
                </div>
                ) : (
                    <p>select a song pls</p>
                )}
            </div>
        </div>
    );
}

export default Rate;