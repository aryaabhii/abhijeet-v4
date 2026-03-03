import axios from "axios";

// Accessing via environment variables for security
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

const youtubeBase = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: apiKey }
});

// Fetch playlists
export const fetchPlaylists = async () => {
  try {
    const { data } = await youtubeBase.get("/playlists", {
      params: {
        part: "snippet",
        channelId: channelId,
        maxResults: 10,
      }
    });
    return data.items;
  } catch (error) {
    console.error("Transmission_Error:", error);
    throw new Error("Failed to sync playlists.");
  }
};

// Fetch all videos
export const fetchAllVideos = async (pageToken = "", limit = 5) => {
  try {
    const { data } = await youtubeBase.get("/search", {
      params: {
        part: "snippet",
        channelId: channelId,
        maxResults: limit,
        type: "video",
        pageToken: pageToken,
      }
    });
    return data;
  } catch (error) {
    console.error("Packet_Loss:", error);
    throw new Error("Failed to fetch video stream.");
  }
};

// Fetch videos by playlist
export const fetchVideosByPlaylist = async (playlistId) => {
  try {
    const { data } = await youtubeBase.get("/playlistItems", {
      params: {
        part: "snippet",
        playlistId: playlistId,
        maxResults: 50,
      }
    });
    return data.items;
  } catch (error) {
    console.error("Node_Failure:", error);
    throw new Error("Failed to retrieve playlist items.");
  }
};