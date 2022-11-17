import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BreedContext, BreedContextType } from "../../providers";
import { BreedType } from "../../types";

const Detail = () => {
  const context = useContext<BreedContextType>(BreedContext);
  const { register, handleSubmit, reset } = useForm<BreedType>();

  const onSubmit: SubmitHandler<BreedType> = (data) => {
    context.save(data);
  };

  useEffect(() => {
    reset(context.breed);
  }, [reset, context]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Breed:</label>
      <input {...register("name")} />
      <button type="submit">Save</button>
    </form>
  );
};

export default Detail;
