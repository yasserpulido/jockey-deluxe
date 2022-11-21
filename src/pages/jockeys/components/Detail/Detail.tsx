import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCountry, useGender } from "../../../../hooks";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers/jockey";

const Detail = () => {
  const { data: countries } = useCountry();
  const { data: genders } = useGender();
  const context = React.useContext(JockeyContext);
  const { register, handleSubmit, reset } = useForm<Jockey>({
    defaultValues: context.jockey,
  });

  const onSubmit: SubmitHandler<Jockey> = (data) => {
    context.save(data);
  };

  useEffect(() => {
    reset(context.jockey);
  }, [reset, context.jockey]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input {...register("firstname")} />
      <label>Last Name:</label>
      <input {...register("lastname")} />
      <label>Birth:</label>
      <input {...register("birth")} type="date" />
      <label>Gender:</label>
      <select {...register("gender")}>
        {genders?.map((gender) => (
          <option key={gender.id} value={gender.id}>
            {gender.gender}
          </option>
        ))}
      </select>
      <label>Nationality:</label>
      <select {...register("nationality")}>
        {countries?.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default Detail;
