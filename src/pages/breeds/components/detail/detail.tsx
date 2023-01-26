import styled from "@emotion/styled";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, colors, Input, Modal } from "../../../../design-system";
import { Breed, ModalFooter } from "../../../../types";
import { BreedContext, BreedContextType } from "../../providers";

const Detail = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const context = useContext<BreedContextType>(BreedContext);
  const { control, handleSubmit, reset, getValues } = useForm<Breed>({
    defaultValues: context.breed,
  });

  const ALERT_SETUP = {
    success: {
      type: "success",
      text: "Success",
    },
    error: {
      type: "error",
      text: "Error",
    },
  };

  useEffect(() => {
    reset(context.breed);
  }, [reset, context]);

  const onSubmit: SubmitHandler<Breed> = (data) => {
    setModalFooter({
      header: "Save",
      content: `Do you want to save ${data.name}?`,
      onClick: saveHandler,
    });
    setShowModal(true);
  };

  const saveHandler = () => {
    context.save(getValues());
    setShowModal(false);
  };

  const deleteHandler = () => {
    if (context.breed !== undefined) {
      context.delete(context.breed.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.breed);
    if (context.breed && context.breed.id.length > 0) {
      context.reset();
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Form Breed</legend>
          <Header>
            <Button variant="Link" text="Reset" onClick={resetHandler} />
          </Header>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "Please enter a name.",
              },
              minLength: {
                value: 3,
                message: "The name must have at least 3 letters.",
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input label="Name" errors={errors.name?.message} {...field} />
            )}
          />
          <Footer>
            <Button
              text="Delete"
              variant="Danger"
              type="button"
              disabled={!!!context.breed?.id}
              onClick={() => {
                if (context.breed?.id) {
                  setModalFooter({
                    header: "Delete",
                    content: `Do you want to delete ${context.breed.name}?`,
                    onClick: deleteHandler,
                  });
                  setShowModal(true);
                }
              }}
            />
            <Button text="Save" variant="Success" type="submit" />
          </Footer>
        </fieldset>
      </Form>
      {showModal && (
        <Modal header={modalFooter.header} content={modalFooter.content}>
          <Button
            text="Cancel"
            onClick={() => setShowModal(false)}
            variant="Danger"
            type="button"
          />
          <Button
            text="Ok"
            onClick={() => modalFooter.onClick()}
            variant="Success"
            type="button"
          />
        </Modal>
      )}
      {context.status !== "idle" && (
        <Alert
          status={ALERT_SETUP[context.status]}
          reset={context.resetQueryStatus}
        />
      )}
    </React.Fragment>
  );
};

const Form = styled.form({
  marginBottom: "1rem",
  backgroundColor: colors.White,

  "& fieldset": {
    border: `1px solid ${colors.Gunmetal}`,
    padding: "1rem",
  },

  "& legend": {
    fontWeight: "bold",
  },
});

const Header = styled.div({
  textAlign: "end",
});

const Footer = styled.footer({
  paddingTop: "1rem",
  textAlign: "end",

  "& button:first-of-type": {
    marginRight: "0.2rem",
  },
});

export default Detail;
