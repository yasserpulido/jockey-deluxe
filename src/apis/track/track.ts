import { Track } from "../../types";

export const getTracks = async () => {
  const response = await fetch("http://localhost:3001/api/track");
  return response.json();
};

export const createTrack = async (track: Track) => {
  await fetch("http://localhost:3001/api/track", {
    method: "POST",
    body: JSON.stringify(track),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const editTrack = async (track: Track) => {
  await fetch(`http://localhost:3001/api/track/${track.id}`, {
    method: "PUT",
    body: JSON.stringify(track),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteTrack = async (id: string) => {
  await fetch(`http://localhost:3001/api/track/${id}`, {
    method: "DELETE",
  });
};
