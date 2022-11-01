import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { SubmitHandler, useForm } from "react-hook-form";
import { StudContext } from "../../providers/Stud";
import { StoreType } from "../../models";
import { StudType } from "./types";

function Detail() {
  const context = React.useContext(StudContext) as StoreType;

  const { register, handleSubmit, reset } = useForm<StudType>({
    defaultValues: context.stud,
  });

  useEffect(() => {
    reset(context.stud);
  }, [reset, context.stud]);

  const onSubmit: SubmitHandler<StudType> = (data) => {
    if (context.stud.id) data = { ...data, id: context.stud.id };
    context.save(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Full Name:</label>
      <input {...register("fullName")} />
      <button type="submit">Save</button>
    </form>
  );
}

export default observer(Detail);
