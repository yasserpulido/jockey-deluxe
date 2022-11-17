import React, { useState } from "react";
import {
  countries as countriesMock,
  tracks as tracksMock,
} from "../../../mocks";
import { CountryType, TrackType } from "../types";

const trackDefaultValues = {
  id: "",
  name: "",
  country: "",
  state: "",
  city: "",
};

export type TrackContextType = {
  track?: TrackType;
  countries: Array<CountryType>;
  save: (track: TrackType) => void;
  remove: (id: string) => void;
  trackSelected: (track: TrackType) => void;
  getTracks: () => Array<TrackType>;
};

export const TrackContext = React.createContext<TrackContextType>({
  countries: [],
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
  const [track, setTrack] = useState<TrackType>();
  const [tracks, setTracks] = useState(tracksMock);

  const getHandler = () => {
    let tracksArray: Array<TrackType> = [];
    tracks.forEach((e) => {
      countriesMock.forEach((c) => {
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
      setTrack({ ...trackDefaultValues, country: countriesMock[0].id });
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
        countries: countriesMock,
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
