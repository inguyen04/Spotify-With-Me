const clientId = "cef9cca2812d435dac59804107b8fcba"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

export async function init() {
//   debugger;
//   let token = localStorage.getItem("access_token"); // Retrieve the token from local storage

//   if (token == "undefined") {
    const token = await getAccessToken(clientId, code); // Obtain a new access token if not available
//   }
  const profile = await fetchProfile(token);
  console.log(profile); // Profile data logs to console

  populateUI(profile);
  sendProfileIdToBackend(profile.id);
}

export async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/home");
  params.append(
    "scope",
    "user-read-private user-read-email user-read-recently-played"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  debugger;
  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/home");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  localStorage.setItem("access_token", access_token);
  return access_token;
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

async function sendProfileIdToBackend(profileId) {
  const response = await fetch("http://localhost:5000/receive-userid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profile_id: profileId }),
  });

  if (response.ok) {
    console.log("Profile ID sent successfully");
  } else {
    console.error("Failed to send Profile ID");
  }
}

export async function getUserInfo() {
  let token = localStorage.getItem("access_token");

  if (token == "undefined") {
    token = await getAccessToken(clientId, code); // Obtain a new access token if not available
  }
  const profile = await fetchProfile(token);
  console.log(profile); // Profile data logs to console

  sendProfileIdToBackend(profile.id);
}

function populateUI(profile) {
  document.getElementById("displayName").innerText = profile.display_name;

  localStorage.setItem("name", profile.display_name);

  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar").appendChild(profileImage);
    document.getElementById("imgUrl").innerText = profile.images[0].url;
  }
  document.getElementById("id").innerText = profile.id;

  localStorage.setItem("profile_id", profile.id);

  document.getElementById("email").innerText = profile.email;
  document.getElementById("uri").innerText = profile.uri;
  document
    .getElementById("uri")
    .setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  document.getElementById("url").setAttribute("href", profile.href);
}

export async function fetchRecentlyPlayedSongs() {
  let token = localStorage.getItem("access_token");

  if (token == "undefined") {
    token = await getAccessToken(clientId, code); // Obtain a new access token if not available
  }

  const result = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!result.ok) {
    throw new Error("Failed to fetch recently played songs");
  }

  const data = await result.json();

  //console.log(data.items.map(item => item.track));
  return data.items.map((item) => item.track);
}

export async function getProfileImage() {
  let token = localStorage.getItem("access_token");

  if (token == "undefined") {
    token = await getAccessToken(clientId, code); // Obtain a new access token if not available
  }
  const profile = await fetchProfile(token);
  return profile.images.length > 0 ? profile.images[0].url : null;
}
