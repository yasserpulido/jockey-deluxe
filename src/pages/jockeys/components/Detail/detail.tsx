import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../../../design-system/theme/colors";
import { Jockey, ModalFooter } from "../../../../types";
import { JockeyContext } from "../../providers/jockey";
import { Alert, Button, Dropdown, Input, Modal } from "../../../../design-system";
import { CommonContext } from "../../../../providers/common";
import { useTranslation } from "react-i18next";

const Detail = () => {
  const { t } = useTranslation("jockey");
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const common = useContext(CommonContext);
  const context = useContext(JockeyContext);
  const { control, handleSubmit, reset, getValues } = useForm<Jockey>({
    defaultValues: context.jockey,
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
    reset(context.jockey);
  }, [reset, context.jockey]);

  const onSubmit: SubmitHandler<Jockey> = (data) => {
    setModalFooter({
      header: "Save",
      content: t("modals.save_message"),
      onClick: saveHandler,
    });
    setShowModal(true);
  };

  const saveHandler = () => {
    context.save(getValues());
    setShowModal(false);
  };

  const deleteHandler = () => {
    if (context.jockey !== undefined) {
      context.delete(context.jockey.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.jockey);
    if (context.jockey && context.jockey.id.length > 0) {
      context.reset();
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>{t("labels.form_title")}</legend>
          <Header>
            <Button
              variant="Link"
              text={t("inputs.reset")}
              onClick={resetHandler}
            />
          </Header>
          <InputsContainer>
            <Controller
              control={control}
              name="firstname"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: t("errors.first_name"),
                },
                minLength: {
                  value: 3,
                  message: t("errors.first_name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("labels.first_name")}
                  errors={errors.firstname?.message}
                  placeholder={t("placeholders.general_input") as string}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="lastname"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: t("errors.last_name"),
                },
                minLength: {
                  value: 3,
                  message: t("errors.last_name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("labels.last_name")}
                  errors={errors.lastname?.message}
                  placeholder={t("placeholders.general_input") as string}
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
                  message: t("errors.birth_date"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("labels.birth_date")}
                  type="date"
                  errors={errors.birth?.message}
                  placeholder={t("placeholders.general_input") as string}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              rules={{
                required: { value: true, message: t("errors.gender") },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("labels.gender")}
                  options={common.gender.data}
                  errors={errors.gender?.message}
                  placeholder={t("placeholders.general_dropdown") as string}
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
                  message: t("errors.nationality"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("labels.nationality")}
                  options={common.country.data}
                  errors={errors.nationality?.message}
                  placeholder={t("placeholders.general_dropdown") as string}
                  {...field}
                />
              )}
            />
          </InputsContainer>
          <Footer>
            <Button
              text={t("inputs.delete")}
              variant="Danger"
              type="button"
              disabled={!!!context.jockey?.id}
              onClick={() => {
                if (context.jockey?.id) {
                  setModalFooter({
                    header: t("modals.delete"),
                    content: t("modals.delete_message"),
                    onClick: deleteHandler,
                  });
                  setShowModal(true);
                }
              }}
            />
            <Button text={t("inputs.save")} variant="Success" type="submit" />
          </Footer>
        </fieldset>
      </Form>
      {showModal && (
        <Modal header={modalFooter.header} content={modalFooter.content}>
          <Button
            text={t("inputs.no")}
            onClick={() => setShowModal(false)}
            variant="Danger"
            type="button"
          />
          <Button
            text={t("inputs.yes")}
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

const InputsContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const Footer = styled.footer({
  paddingTop: "1rem",
  textAlign: "end",

  "& button:first-of-type": {
    marginRight: "0.2rem",
  },
});

const Header = styled.div({
  textAlign: "end",
});

export default Detail;
