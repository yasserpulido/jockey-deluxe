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
    console.log(data);
    // context.save(data);
  };

  useEffect(() => {
    reset(context.jockey);
  }, [reset, context.jockey]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Form Jockey</legend>
        <Container>
          <Controller
            control={control}
            name="firstname"
            defaultValue=""
            rules={{
              required: { value: true, message: "Please enter a first name." },
              minLength: {
                value: 3,
                message: "The first name must have at least 3 letters.",
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label="First Name"
                placeholder="Type here"
                errors={errors.firstname?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="lastname"
            defaultValue=""
            rules={{
              required: { value: true, message: "Please enter a last name." },
              minLength: {
                value: 3,
                message: "The last name must have at least 3 letters.",
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label="Last Name"
                placeholder="Type here"
                errors={errors.lastname?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="birth"
            defaultValue=""
            rules={{
              required: { value: true, message: "Please enter a birth date." },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label="Birth"
                type="date"
                errors={errors.birth?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            defaultValue=""
            rules={{
              required: { value: true, message: "Please select a gender." },
            }}
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Gender"
                options={genders}
                errors={errors.gender?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="nationality"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Please select a nationality.",
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Nationality"
                options={countries}
                errors={errors.nationality?.message}
                {...field}
              />
            )}
          />
        </Container>
        <Footer>
          <Button text="Save" variant="Success" type="submit" />
        </Footer>
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

const Container = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const Footer = styled.footer({});

export default Detail;
