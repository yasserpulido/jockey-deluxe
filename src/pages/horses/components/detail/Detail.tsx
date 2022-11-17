import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HorseContext, HorseContextType } from "../../providers";
import { HorseType } from "../../types";

const Detail = () => {
  const context = useContext<HorseContextType>(HorseContext);
  const { register, handleSubmit } = useForm<HorseType>();

  const onSubmit: SubmitHandler<HorseType> = (data) => {
    context.save(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name")} />
      <label>Birth:</label>
      <input {...register("birth")} type="date" />
      <label>Genre:</label>
      <select {...register("gender")}>
        <option value="g01">Male</option>
        <option value="g02">Female</option>
      </select>
      <label>Father:</label>
      <input {...register("fatherId")} />
      <label>Mother:</label>
      <input {...register("motherId")} />
      <button type="submit">Save</button>
    </form>
  );
};

export default Detail;
