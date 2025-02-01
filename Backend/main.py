import requests

def get_spotify_token(client_id, client_secret):
    url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }

    response = requests.post(url, headers=headers, data=data)
    
    if response.status_code == 200:
        return response.json().get('access_token')
    else:
        print(f"Failed to get token: {response.status_code}")
        return None

if __name__ == "__main__":
    client_id = 'cef9cca2812d435dac59804107b8fcba'
    client_secret = 'e989e48f71b741f496a410838da0e68e'
    token = get_spotify_token(client_id, client_secret)
    if token:
        print(f"Access Token: {token}")

    