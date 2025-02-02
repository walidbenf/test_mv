import axios from 'axios';

let accessToken: string | null = null;

async function getAccessToken() {
  const response = await axios.post(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
  );
  return response.data.access_token;
}

export async function igdbClient() {
  if (!accessToken) {
    accessToken = await getAccessToken();
  }

  return axios.create({
    baseURL: 'https://api.igdb.com/v4',
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID!,
      'Authorization': `Bearer ${accessToken}`
    }
  });
}