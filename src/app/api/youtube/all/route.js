import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pageToken = searchParams.get('pageToken') || "";
  const limit = searchParams.get('limit') || 5;

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        channelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID,
        maxResults: limit,
        type: "video",
        pageToken: pageToken,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}