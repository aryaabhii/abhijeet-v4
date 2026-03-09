import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('playlistId');

  if (!playlistId) return NextResponse.json({ error: "Missing playlistId" }, { status: 400 });

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
      params: {
        part: "snippet",
        playlistId: playlistId,
        maxResults: 50,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      }
    });
    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch playlist items" }, { status: 500 });
  }
}