import { Races } from "./Races";
import { Provider } from "./providers";

export const index = () => {
  return (
    <Provider>
      <Races />
    </Provider>
  );
};
