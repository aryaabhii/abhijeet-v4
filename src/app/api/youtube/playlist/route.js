import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
      params: {
        part: "snippet",
        channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID,
        maxResults: 10,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      }
    });
    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch playlists" }, { status: 500 });
  }
}