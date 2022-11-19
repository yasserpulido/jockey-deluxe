import { useContext } from "react";
import { BreedContext, BreedContextType } from "../../providers";

const List = () => {
  const context = useContext<BreedContextType>(BreedContext);

  if (context.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {context.breeds?.map((breed) => (
        <li key={breed.id}>
          {breed.name}
          <button type="button" onClick={() => context.breedSelected(breed)}>
            Edit
          </button>
          <button type="button" onClick={() => context.remove(breed.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
