import React, { useState } from "react";
import { useCountry } from "../../../hooks/country";
import { tracks as tracksMock } from "../../../mocks/tracks";
import { TrackType } from "../types";

const trackDefaultValues = {
  id: "",
  name: "",
  country: "",
  state: "",
  city: "",
};

export type TrackContextType = {
  track?: TrackType;
  save: (track: TrackType) => void;
  remove: (id: string) => void;
  trackSelected: (track: TrackType) => void;
  getTracks: () => Array<TrackType>;
};

export const TrackContext = React.createContext<TrackContextType>({
  save(track: TrackType) {},
  remove(id: string) {},
  trackSelected(track: TrackType) {},
  getTracks(): Array<TrackType> {
    return [];
  },
});

type Props = {
  children: import("react").ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const { data: countries } = useCountry();
  const [track, setTrack] = useState<TrackType>();
  const [tracks, setTracks] = useState(tracksMock);

  const getHandler = () => {
    let tracksArray: Array<TrackType> = [];
    tracks.forEach((e) => {
      countries.forEach((c) => {
        if (c.id === e.country) {
          tracksArray.push({ ...e, country: c.name });
          return;
        }
      });
    });
    return tracksArray;
  };

  const saveHandler = (track: TrackType) => {
    if (!track.id) {
      setTracks((prevState) => {
        return [
          ...prevState,
          (track = {
            ...track,
            id: Math.floor(Math.random() * 100).toString(),
          }),
        ];
      });
    } else {
      const updatedTracks = tracks.map((t) => {
        if (t.id === track.id) {
          return { ...track };
        }
        return t;
      });
      setTracks(updatedTracks);
      setTrack({ ...trackDefaultValues });
    }
  };

  const removeHandler = (id: string) => {
    setTracks(tracks.filter((t) => t.id !== id));
  };

  const trackHandler = (track: TrackType) => {
    setTrack(track);
  };

  return (
    <TrackContext.Provider
      value={{
        track,
        save: saveHandler,
        remove: removeHandler,
        trackSelected: trackHandler,
        getTracks: getHandler,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};
