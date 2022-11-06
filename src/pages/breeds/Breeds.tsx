import { Detail } from "./components/detail";
import { List } from "./components/list";
import { Provider } from "./providers";

const Breeds = () => {
  return (
    <Provider>
      <Detail />
      <List />
    </Provider>
  );
};

export default Breeds;
