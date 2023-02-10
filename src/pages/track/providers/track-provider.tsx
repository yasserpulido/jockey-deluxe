import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Track } from "../../../types";
import { Track as api } from "../../../apis";

const trackDefaultValues = {
  id: "",
  name: "",
  country: "",
};

export type TrackContextType = {
  status: "idle" | "success" | "error";
  isLoading: boolean;
  track: Track;
  tracks: Array<Track>;
  save: (track: Track) => void;
  delete: (id: string) => void;
  trackSelected: (track: Track) => void;
  reset: () => void;
  resetQueryStatus: () => void;
};

export const Context = React.createContext<TrackContextType>({
  status: "idle",
  isLoading: false,
  track: trackDefaultValues,
  tracks: [],
  save: () => {},
  delete: () => {},
  trackSelected: () => {},
  reset: () => {},
  resetQueryStatus: () => {},
});

type Props = {
  children: import("react").ReactNode;
};

export const Provider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [track, setTrack] = useState<Track>(trackDefaultValues);
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [queryStatus, setQueryStatus] =
    useState<"idle" | "success" | "error">("idle");
  const { data, status, isLoading } = useQuery({
    queryKey: ["Track"],
    queryFn: api.getTracks,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: api.createTrack,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Track"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const editMutation = useMutation({
    mutationFn: api.editTrack,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Track"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteTrack,
    onSuccess: () => {
      setQueryStatus("success");
      queryClient.invalidateQueries(["Track"]);
    },
    onError: () => {
      setQueryStatus("error");
    },
  });

  useEffect(() => {
    if (status === "success" && data !== undefined) {
      setTracks(data);
    }
  }, [status, data]);

  const saveHandler = (track: Track) => {
    if (!track.id) {
      createMutation.mutate(track);
    } else {
      editMutation.mutate(track);
    }
    setTrack(trackDefaultValues);
  };

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
    setTrack(trackDefaultValues);
  };

  const trackHandler = (track: Track) => {
    setTrack(track);
  };

  const resetHandler = () => {
    setTrack(trackDefaultValues);
  };

  const resetQueryStatusHandler = () => {
    setQueryStatus("idle");
  };

  return (
    <Context.Provider
      value={{
        status: queryStatus,
        isLoading,
        track,
        tracks,
        save: saveHandler,
        delete: deleteHandler,
        trackSelected: trackHandler,
        reset: resetHandler,
        resetQueryStatus: resetQueryStatusHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};
