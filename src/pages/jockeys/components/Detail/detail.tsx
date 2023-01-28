import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../../../design-system/theme/colors";
import { Jockey, ModalFooter } from "../../../../types";
import { JockeyContext } from "../../providers/jockey";
import {
  Alert,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Modal,
} from "../../../../design-system";
import { CommonContext } from "../../../../providers/common";
import { useTranslation } from "react-i18next";

const Detail = () => {
  const { t } = useTranslation(["jockey", "form"]);
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
    console.log(data.job);
    // setModalFooter({
    //   header: "Save",
    //   content: t("modals.save_message"),
    //   onClick: saveHandler,
    // });
    // setShowModal(true);
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
          <legend>{t("jockey:labels.form_title")}</legend>
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
                  message: t("jockey:errors.first_name"),
                },
                minLength: {
                  value: 3,
                  message: t("jockey:errors.first_name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("jockey:labels.first_name")}
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
                  message: t("jockey:errors.last_name"),
                },
                minLength: {
                  value: 3,
                  message: t("jockey:errors.last_name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("jockey:labels.last_name")}
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
                  message: t("jockey:errors.birth_date"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("jockey:labels.birth_date")}
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
                required: { value: true, message: t("errors.gender") },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("jockey:labels.gender")}
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
                  message: t("jockey:errors.nationality"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("jockey:labels.nationality")}
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
              <span>{t("jockey:labels.job")}:</span>
              <CheckboxContainer>
                <Controller
                  control={control}
                  name="job.jockey"
                  render={({ field: { name, value, ...rest } }) => (
                    <Checkbox
                      label="Jockey"
                      value={name}
                      name={name}
                      {...rest}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="job.trainer"
                  defaultValue={false}
                  render={({ field: { name, value, ...rest } }) => (
                    <Checkbox
                      label="Trainer"
                      value={name}
                      name={name}
                      {...rest}
                    />
                  )}
                />
              </CheckboxContainer>
            </JobContainer>
          </InputsContainer>
          <Footer>
            <Button
              text={t("form:inputs.delete")}
              variant="Danger"
              type="button"
              disabled={!!!context.jockey?.id}
              onClick={() => {
                if (context.jockey?.id) {
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

const JobContainer = styled.div({});

const CheckboxContainer = styled.div({
  marginTop: "0.3rem",
  display: "flex",

  "& > div": {
    marginRight: "1.4rem",
  },
});

export default Detail;
