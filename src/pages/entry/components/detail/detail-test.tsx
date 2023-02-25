import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StoreType } from "../../models";
import { EntryProvider } from "../../providers";

const Detail = observer(() => {
  const context = useContext(EntryProvider.Context) as StoreType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    context.createEntry(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
    </form>
  );
});

export default Detail;
