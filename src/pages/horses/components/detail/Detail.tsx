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
      <label>Birth:</label>
      <input {...register("birth")} type="date" />
      <label>Genre:</label>
      <select {...register("gender")}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label>Father:</label>
      <input {...register("father")} />
      <label>Mother:</label>
      <input {...register("mother")} />
      <button type="submit">Save</button>
    </form>
  );
};
