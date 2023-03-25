import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  colors,
  Dropdown,
  Input,
  Modal,
} from "../../../../design-system";
import { CommonProvider } from "../../../../providers";
import { Horse, ModalFooter } from "../../../../types";
import { HorseProvider } from "../../providers";

const Detail = () => {
  const { t } = useTranslation(["horse", "form"]);
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const common = useContext(CommonProvider.Context);
  const context = useContext<HorseProvider.ContextType>(HorseProvider.Context);
  const { control, handleSubmit, reset, getValues } = useForm<Horse>({
    defaultValues: context.horse,
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

  const onSubmit: SubmitHandler<Horse> = (data) => {
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
    if (context.horse !== undefined) {
      context.delete(context.horse.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.horse);
    if (context.horse.id.length > 0) {
      context.reset();
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Legend>{t("horse:labels.form_title")}</Legend>
          <Header>
            <Button
              variant="link"
              text={t("form:inputs.reset")}
              onClick={resetHandler}
              colorText="danger"
            />
          </Header>
          <InputsContainer>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: t("horse:errors.name"),
                },
                minLength: {
                  value: 3,
                  message: t("horse:errors.name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("horse:labels.name")}
                  errors={errors.name?.message}
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
                  message: t("horse:errors.birth_date"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("horse:labels.birth_date")}
                  type="date"
                  errors={errors.birth?.message}
                  placeholder={t("form:placeholders.general_input") as string}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="genderId"
              defaultValue=""
              rules={{
                required: { value: true, message: t("horse:errors.gender") },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("horse:labels.gender")}
                  options={common.gender.data}
                  errors={errors.genderId?.message}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="nationalityId"
              defaultValue=""
              rules={{
                required: { value: true, message: t("horse:errors.gender") },
              }}
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("horse:labels.nationality")}
                  options={common.gender.data}
                  errors={errors.genderId?.message}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="motherId"
              defaultValue=""
              render={({ field }) => (
                <Dropdown
                  label={t("horse:labels.mother")}
                  options={common.gender.data}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="fatherId"
              defaultValue=""
              render={({ field }) => (
                <Dropdown
                  label={t("horse:labels.father")}
                  options={common.gender.data}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
                  {...field}
                />
              )}
            />
          </InputsContainer>
          <Footer>
            <Button
              text={t("form:inputs.delete")}
              variant="danger"
              type="button"
              disabled={!!!context.horse.id}
              onClick={() => {
                if (context.horse.id) {
                  setModalFooter({
                    header: t("form:modals.delete_title"),
                    content: t("form:modals.delete_message"),
                    onClick: deleteHandler,
                  });
                  setShowModal(true);
                }
              }}
            />
            <Button
              text={t("form:inputs.save")}
              variant="success"
              type="submit"
            />
          </Footer>
        </Fieldset>
      </Form>
      {showModal && (
        <Modal header={modalFooter.header} content={modalFooter.content}>
          <Button
            text={t("form:inputs.no")}
            onClick={() => setShowModal(false)}
            variant="danger"
            type="button"
          />
          <Button
            text={t("form:inputs.yes")}
            onClick={() => modalFooter.onClick()}
            variant="success"
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

const InputsContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1rem",
});

const Form = styled.form({
  marginBottom: "1rem",
  backgroundColor: colors.White,
});

const Fieldset = styled.fieldset({
  border: `1px solid ${colors.Gunmetal}`,
  padding: "1rem",
});

const Legend = styled.legend({
  fontWeight: "bold",
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
