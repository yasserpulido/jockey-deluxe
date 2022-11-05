import { default as JockeysPage } from "./Jockeys";
import { Provider } from "./providers";

const Jockeys = () => {
  return (
    <Provider>
      <JockeysPage />
    </Provider>
  );
};

export default Jockeys;
