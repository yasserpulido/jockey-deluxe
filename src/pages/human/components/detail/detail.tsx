import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../../../design-system/theme/colors";
import { Human, ModalFooter } from "../../../../types";
import { HumanContext, humanDefaultValues } from "../../providers/human";
import {
  Alert,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Modal,
} from "../../../../design-system";
import { useTranslation } from "react-i18next";
import { Alert as ErrorIcon } from "grommet-icons";
import { CommonProvider } from "../../../../providers";

const Detail = () => {
  const { t } = useTranslation(["human", "form"]);
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const common = useContext(CommonProvider.Context);
  const context = useContext(HumanContext);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<Human>({
    defaultValues: humanDefaultValues,
  });
  const errorMessage =
    errors.job?.jockey?.message || errors.job?.trainer?.message;

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
    reset(context.human);
  }, [reset, context.human]);

  const onSubmit: SubmitHandler<Human> = (data) => {
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
    if (context.human !== undefined) {
      context.delete(context.human.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.human);
    context.reset();
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>{t("human:labels.form_title")}</legend>
          <Header>
            <Button
              variant="Link"
              text={t("form:inputs.reset")}
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
                  message: t("human:errors.first_name"),
                },
                minLength: {
                  value: 3,
                  message: t("human:errors.first_name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("human:labels.first_name")}
                  errors={errors.firstname?.message}
                  placeholder={t("form:placeholders.general_input") as string}
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
                  message: t("human:errors.last_name"),
                },
                minLength: {
                  value: 3,
                  message: t("human:errors.last_name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("human:labels.last_name")}
                  errors={errors.lastname?.message}
                  placeholder={t("form:placeholders.general_input") as string}
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
                  message: t("human:errors.birth_date"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("human:labels.birth_date")}
                  type="date"
                  errors={errors.birth?.message}
                  placeholder={t("form:placeholders.general_input") as string}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="gender"
              defaultValue=""
              rules={{
                required: { value: true, message: t("human:errors.gender") },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("human:labels.gender")}
                  options={common.gender.data}
                  errors={errors.gender?.message}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
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
                  message: t("human:errors.nationality"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("human:labels.nationality")}
                  options={common.country.data}
                  errors={errors.nationality?.message}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
                  {...field}
                />
              )}
            />
            <JobContainer>
              <span>{t("human:labels.job")}:</span>
              <CheckboxContainer>
                <Controller
                  control={control}
                  name="job.jockey"
                  rules={{
                    validate: () => {
                      if (
                        Object.values(getValues().job).every(
                          (val) => val === false
                        )
                      ) {
                        const message = t("human:errors.job");
                        return message;
                      }

                      return undefined;
                    },
                  }}
                  defaultValue={false}
                  render={({ field: { name, ...rest } }) => (
                    <Checkbox
                      label="Jockey"
                      name={name}
                      {...rest}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="job.trainer"
                  rules={{
                    validate: () => {
                      if (
                        Object.values(getValues().job).every(
                          (val) => val === false
                        )
                      ) {
                        const message = t("human:errors.job");
                        return message;
                      }

                      return undefined;
                    },
                  }}
                  defaultValue={false}
                  render={({ field: { name, ...rest } }) => (
                    <Checkbox
                      label="Trainer"
                      name={name}
                      {...rest}
                    />
                  )}
                />
              </CheckboxContainer>
              <Error>
                {errorMessage ? (
                  <>
                    <ErrorIcon size="small" />
                    {errorMessage}
                  </>
                ) : null}
              </Error>
            </JobContainer>
          </InputsContainer>
          <Footer>
            <Button
              text={t("form:inputs.delete")}
              variant="Danger"
              type="button"
              disabled={!!!context.human?.id}
              onClick={() => {
                if (context.human?.id) {
                  setModalFooter({
                    header: t("form:modals.delete"),
                    content: t("form:modals.delete_message"),
                    onClick: deleteHandler,
                  });
                  setShowModal(true);
                }
              }}
            />
            <Button
              text={t("form:inputs.save")}
              variant="Success"
              type="submit"
            />
          </Footer>
        </fieldset>
      </Form>
      {showModal && (
        <Modal header={modalFooter.header} content={modalFooter.content}>
          <Button
            text={t("form:inputs.no")}
            onClick={() => setShowModal(false)}
            variant="Danger"
            type="button"
          />
          <Button
            text={t("form:inputs.yes")}
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

const JobContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const CheckboxContainer = styled.div({
  display: "flex",

  "& > div": {
    marginRight: "1.4rem",
  },
});

const Error = styled.small({
  color: colors.PersianRed,
  display: "flex",
  alignItems: "center",

  "& svg, path": {
    marginRight: "0.4rem",
    stroke: colors.PersianRed,
  },
});

export default Detail;
