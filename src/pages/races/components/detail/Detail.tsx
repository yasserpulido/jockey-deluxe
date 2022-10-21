import { SubmitHandler, useForm } from "react-hook-form";

export const Detail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name")} />
      <label>Date:</label>
      <input {...register("date")} type="date" />
      <label>Time:</label>
      <input {...register("time")} type="time" />
      <label>Place:</label>
      <input {...register("place")} />
      <label>Distance:</label>
      <input {...register("distance")} />
    </form>
  );
};
