import { Detail } from "./components/detail";
import { List } from "./components/list";
import { Provider } from "./providers";

const Tracks = () => {
  return (
    <Provider>
      <Detail />
      <List />
    </Provider>
  );
};

export default Tracks;
