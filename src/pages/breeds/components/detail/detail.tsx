import styled from "@emotion/styled";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Button, colors, Input, Modal } from "../../../../design-system";
import { Breed, ModalFooter } from "../../../../types";
import { BreedContext, BreedContextType } from "../../providers";

const Detail = () => {
  const { t } = useTranslation(["breed", "form"]);
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
      header: t("form:modals.save_title"),
      content: t("form:modals.save_message"),
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
          <legend>{t("breed:labels.form_title")}</legend>
          <Header>
            <Button
              variant="Link"
              text={t("form:inputs.reset")}
              onClick={resetHandler}
            />
          </Header>
          <Controller
            control={control}
            name="name"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t("breed:errors.full_name"),
              },
              minLength: {
                value: 3,
                message: t("breed:errors.full_name_min"),
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label={t("breed:labels.full_name")}
                errors={errors.name?.message}
                {...field}
              />
            )}
          />
          <Footer>
            <Button
              text={t("form:inputs.delete")}
              variant="Danger"
              type="button"
              disabled={!!!context.breed?.id}
              onClick={() => {
                if (context.breed?.id) {
                  setModalFooter({
                    header: t("form:modals.delete_title"),
                    content: t("form:modals.delete_message"),
                    onClick: deleteHandler,
                  });
                  setShowModal(true);
                }
              }}
            />
            <Button text={t("form:inputs.save")} variant="Success" type="submit" />
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
