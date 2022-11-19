import { useContext } from "react";
import { TrackContext, TrackContextType } from "../../providers";

const List = () => {
  const context = useContext<TrackContextType>(TrackContext);

  return (
    <ul>
      {context.getTracks().map((track) => (
        <li key={track.id}>
          {`${track.id} ${track.name} ${track.country} ${track.state} ${track.city}`}
          <button type="button" onClick={() => context.trackSelected(track)}>
            Edit
          </button>
          <button type="button" onClick={() => context.remove(track.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;