import { SubmitHandler, useForm } from "react-hook-form";

export const Inscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("race")}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </form>
  );
};
