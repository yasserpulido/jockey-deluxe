import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useCountry, useGender } from "../../../../hooks";
import { colors } from "../../../../design-system/theme/colors";
import { Jockey } from "../../../../types";
import { JockeyContext } from "../../providers/jockey";
import { Button, Dropdown, Input, Modal } from "../../../../design-system";
import React from "react";

const Detail = () => {
  const [showModal, setShowModal] = useState(false);
  const [jockey, setJockey] = useState<Jockey>();

  const { data: countries } = useCountry();
  const { data: genders } = useGender();
  const context = useContext(JockeyContext);
  const { control, handleSubmit, reset } = useForm<Jockey>({
    defaultValues: context.jockey,
  });

  const onSubmit: SubmitHandler<Jockey> = (data) => {
    setJockey(data);
    setShowModal(true);
  };

  const saveHandler = () => {
    if (jockey !== undefined) {
      context.save(jockey);
    }
    setShowModal(false);
  };

  useEffect(() => {
    reset(context.jockey);
  }, [reset, context.jockey]);

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Form Jockey</legend>
          <InputsContainer>
            <Controller
              control={control}
              name="firstname"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Please enter a first name.",
                },
                minLength: {
                  value: 3,
                  message: "The first name must have at least 3 letters.",
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label="First Name"
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
                required: {
                  value: true,
                  message: "Please enter a birth date.",
                },
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
          </InputsContainer>
          <Footer>
            <Button
              text="Delete"
              variant="Danger"
              type="button"
              disabled={!!!context.jockey?.id}
            />
            <Button text="Save" variant="Success" type="submit" />
          </Footer>
        </fieldset>
      </Form>
      <Modal showModal={showModal} header="Save" content="Do you want to save?">
        <Button
          text="Cancel"
          onClick={() => setShowModal(false)}
          variant="Danger"
        />
        <Button text="Ok" onClick={() => saveHandler()} variant="Success" />
      </Modal>
    </React.Fragment>
  );
};

const Form = styled.form({
  backgroundColor: colors.White,

  "& fieldset": {
    border: `1px solid ${colors.Gunmetal}`,
    padding: "1rem",
  },

  "& legend": {
    fontWeight: "bold",
  },
});

const InputsContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const Footer = styled.footer({
  textAlign: "end",

  "& button:first-of-type": {
    marginRight: "0.2rem",
  },
});

export default Detail;
