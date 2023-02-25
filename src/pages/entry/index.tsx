import EntryPage from "./entry-page";
import { EntryProvider } from "./providers";

const Entry = () => {
  return (
    <EntryProvider.Provider>
      <EntryPage />
    </EntryProvider.Provider>
  );
};

export default Entry;
