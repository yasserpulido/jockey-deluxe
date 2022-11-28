import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCountry, useGender } from "../../../../hooks";
import { colors } from "../../../../design-system/theme/colors";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers/jockey";
import { Button, Dropdown, Input } from "../../../../design-system";

const Detail = () => {
  const { data: countries } = useCountry();
  const { data: genders } = useGender();
  const context = React.useContext(JockeyContext);
  const { control, handleSubmit, reset } = useForm<Jockey>({
    defaultValues: context.jockey,
  });

  const onSubmit: SubmitHandler<Jockey> = (data) => {
    context.save(data);
  };

  useEffect(() => {
    reset(context.jockey);
  }, [reset, context.jockey]);

  console.log(context.jockey);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Form Jockey</legend>
        <Controller
          control={control}
          name="firstname"
          defaultValue=""
          render={({ field }) => <Input label="First Name" {...field} />}
        />
        <Controller
          control={control}
          name="lastname"
          defaultValue=""
          render={({ field }) => <Input label="Last Name" {...field} />}
        />
        <Controller
          control={control}
          name="birth"
          defaultValue=""
          render={({ field }) => <Input label="Birth" type="date" {...field} />}
        />
        <Controller
          control={control}
          name="gender"
          defaultValue=""
          render={({ field }) => (
            <Dropdown label="Gender" options={genders} {...field} />
          )}
        />
        <Controller
          control={control}
          name="nationality"
          defaultValue=""
          render={({ field }) => (
            <Dropdown label="nationality" options={countries} {...field} />
          )}
        />
        <Button text="Save" variant="Success" type="submit" />
      </fieldset>
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
