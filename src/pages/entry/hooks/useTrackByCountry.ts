import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Entry, Track } from "../../../types";

export const useTrackByCountry = (
  tracks: Array<Track>,
  countryId: string,
  setValue: UseFormSetValue<Entry>
) => {
  const [tracksByCountry, setTracksByCountry] = useState<Array<Track>>([]);
  
  useEffect(() => {
    const tracksByCountry = tracks.filter(
      (track) => track.country === countryId
    );

    setValue("track", "");
    setTracksByCountry(tracksByCountry);
  }, [countryId, setValue, tracks]);

  return tracksByCountry;
};
