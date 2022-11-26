import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCountry, useGender } from "../../../../hooks";
import { colors } from "../../../../design-system/theme/colors";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers/jockey";
import { Button, Dropdown, Input } from "../../../../design-system";

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

  console.log({ ...register("firstname") });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Form Jockey</legend>
        <Input label="First Name" {...register("firstname")} />
        <Input label="Last Name" {...register("lastname")} />
        <Input label="Birth" {...register("birth")} type="date" />
        {/* <Dropdown label="Gender" {...register("gender")}>
          {genders?.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.gender}
            </option>
          ))}
        </Dropdown> */}
        <Button text="Save" variant="Success" type="submit" />
      </fieldset>
      {/* 
        <label>Birth:</label>
        <input {...register("birth")} />
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
        <Button text="Save" variant="Success" type="submit" /> */}
    </Form>
  );
};

const Form = styled.form({
  margin: "1rem",

  "& fieldset": {
    border: `1px solid ${colors.Gunmetal}`,
    padding: "1rem",
  },
});

export default Detail;
