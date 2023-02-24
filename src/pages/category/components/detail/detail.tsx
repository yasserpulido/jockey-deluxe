import styled from "@emotion/styled";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Button, colors, Input, Modal } from "../../../../design-system";
import { Category, ModalFooter } from "../../../../types";
import { CategoryProvider } from "../../providers";

const Detail = () => {
  const { t } = useTranslation(["category", "form"]);
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const context = useContext<CategoryProvider.ContextType>(
    CategoryProvider.Context
  );
  const { control, handleSubmit, reset, getValues } = useForm<Category>({
    defaultValues: context.category,
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
    reset(context.category);
  }, [reset, context]);

  const onSubmit: SubmitHandler<Category> = (data) => {
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
    if (context.category !== undefined) {
      context.delete(context.category.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.category);
    if (context.category && context.category.id.length > 0) {
      context.reset();
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Legend>{t("category:labels.form_title")}</Legend>
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
                message: t("category:errors.name"),
              },
              minLength: {
                value: 3,
                message: t("category:errors.name_min"),
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label={t("category:labels.name")}
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
              disabled={!!!context.category?.id}
              onClick={() => {
                if (context.category?.id) {
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
