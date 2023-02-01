import styled from "@emotion/styled";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Button, colors, Input, Modal } from "../../../../design-system";
import { ModalFooter, Stud } from "../../../../types";
import { StudProvider } from "../../providers";

const Detail = () => {
  const { t } = useTranslation(["stud", "form"]);
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const context = useContext<StudProvider.ContextType>(StudProvider.Context);
  const { control, handleSubmit, reset, getValues } = useForm<Stud>({
    defaultValues: context.stud,
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
    reset(context.stud);
  }, [reset, context]);

  const onSubmit: SubmitHandler<Stud> = (data) => {
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
    if (context.stud !== undefined) {
      context.delete(context.stud.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.stud);
    if (context.stud?.id?.length > 0) {
      context.reset();
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Legend>{t("stud:labels.form_title")}</Legend>
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
                message: t("stud:errors.name"),
              },
              minLength: {
                value: 3,
                message: t("stud:errors.name_min"),
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label={t("stud:labels.name")}
                errors={errors.name?.message}
                placeholder={t("form:placeholders.general_input") as string}
                {...field}
              />
            )}
          />
          <Footer>
            <Button
              text={t("form:inputs.delete")}
              variant="Danger"
              type="button"
              disabled={!!!context.stud?.id}
              onClick={() => {
                if (context.stud?.id) {
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
              variant="Success"
              type="submit"
            />
          </Footer>
        </Fieldset>
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
