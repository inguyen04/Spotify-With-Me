import spotifyLogo from '/src/assets/spotify.png'
import backgroundPicture from '/src/assets/background.jpg'
import ratingLogo from '/src/assets/rating.png'
import reviewLogo from '/src/assets/review.png'
import headphoneLogo from '/src/assets/headphones.png'
import { redirectToAuthCodeFlow } from "/src/script.jsx"

const clientId = "cef9cca2812d435dac59804107b8fcba"; // Replace with your client ID


function App() {
    const handleLogin = () => {
        redirectToAuthCodeFlow(clientId);
    };

  return (
    <>
      <div class="loginpage">
        <div class="background">
          <img src={backgroundPicture} alt="background-pic"/>
        </div>
        <h1 class="title">Experience Your Music<br></br>
        Like Never Before</h1>
          <p class="description">Come and connect with your friends while listening to music you love.</p>
            <button className="login-button" onClick={handleLogin}>Login With Spotify</button> 
        <a href="https://spotify.com" target="_blank">
          <img src={spotifyLogo} className="logo" alt="Spotify logo" />
        </a>
        <div class="icons">
          <div class="icon-1">
            <p>Rate each song on a five-star scale<br></br>and share your reaction</p>
            <img src={ratingLogo} class="logo-1" alt="Rating logo" />
          </div>
          <div class="icon-2">
            <p>Write and share reviews<br></br>with friends you follow</p>
            <img src={reviewLogo} class="logo-2" alt="Review logo" />
          </div>
          <div class="icon-3">
            <p>Listen to new<br></br>recommended songs</p>
            <img src={headphoneLogo} class="logo-3" alt="Headphone logo" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App