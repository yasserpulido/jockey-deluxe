import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { StoreType } from "../../models";
import { JockeyContext } from "../../providers/Jockey";
import { JockeyType } from "./types";

function Detail() {
  const context = React.useContext(JockeyContext) as StoreType;

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<JockeyType>({
    defaultValues: context.jockey,
  });

  useEffect(() => {
    reset(context.jockey);
  }, [reset, context.jockey]);

  const onSubmit: SubmitHandler<JockeyType> = (data) => {
    if (context.jockey.id) data = { ...data, id: context.jockey.id };
    context.save(data);
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
}

export default observer(Detail);
