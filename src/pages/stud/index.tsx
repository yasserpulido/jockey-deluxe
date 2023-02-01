import { Provider } from "./providers";
import { Studs as StudsPage } from "./stud-test";

export const Studs = () => {
  return (
    <Provider>
      <StudsPage />
    </Provider>
  );
};
