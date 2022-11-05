import { useContext } from "react";
import { BreedContext } from "../../providers/Breed";
import { BreedType } from "../../types/Breed";

const List = () => {
  const context = useContext<Array<BreedType>>(BreedContext);
  return (
    <ul>
      {context.map((breed) => (
        <li>{breed.name}</li>
      ))}
    </ul>
  );
};

export default List;
