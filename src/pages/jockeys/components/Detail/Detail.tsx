import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StoreType } from "../../models";
import { JockeyContext } from "../../providers/Jockey";

export const Detail = () => {
  const context = React.useContext(JockeyContext) as StoreType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Submit: ", data);
    context.create(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input {...register("firstName")} />
      <label>Last Name:</label>
      <input {...register("lastName")} />
      <label>Birth:</label>
      <input {...register("birth")} type="date" />
      <label>Gender:</label>
      <select {...register("gender")}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};
