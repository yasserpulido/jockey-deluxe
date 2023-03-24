import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  colors,
  Dropdown,
  Input,
  Panel,
} from "../../../../design-system";
import { CommonProvider } from "../../../../providers";
import { Entry, ModalFooter } from "../../../../types";
import { StoreType } from "../../models";
import { EntryProvider } from "../../providers";
import { Race } from "./race";

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

const Detail = observer(() => {
  const { t } = useTranslation(["breed", "form"]);
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const common = useContext(CommonProvider.Context);
  const context = useContext(EntryProvider.Context) as StoreType;
  const { control, handleSubmit, reset, getValues } = useForm<Entry>({
    defaultValues: context.entry,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "races",
  });

  useEffect(() => {
    reset(context.entry);
  }, [reset, context]);

  const onSubmit: SubmitHandler<Entry> = (data) => {
    console.log(data);
    // setModalFooter({
    //   header: t("form:modals.save_title"),
    //   content: t("form:modals.save_message"),
    //   onClick: saveHandler,
    // });
    // setShowModal(true);
  };

  const saveHandler = () => {
    //context.createEntry(getValues());
    setShowModal(false);
  };

  const deleteHandler = () => {
    // if (context.breed !== undefined) {
    //   context.delete(context.breed.id);
    // }
    // setShowModal(false);
  };

  const resetHandler = () => {
    // reset(context.breed);
    // if (context.breed && context.breed.id.length > 0) {
    //   context.reset();
    // }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset>
          <Legend>{t("entry:labels.form_title")}</Legend>
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
              name="name"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: t("entry:errors.name"),
                },
                minLength: {
                  value: 3,
                  message: t("entry:errors.name_min"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("entry:labels.name")}
                  errors={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="date"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: t("entry:errors.date"),
                },
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  label={t("entry:labels.date")}
                  type="date"
                  errors={errors.date?.message}
                  placeholder={t("form:placeholders.general_input") as string}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="place"
              defaultValue=""
              render={({ field, formState: { errors } }) => (
                <Dropdown
                  label={t("entry:labels.place")}
                  options={common.gender.data}
                  errors={errors.place?.message}
                  placeholder={
                    t("form:placeholders.general_dropdown") as string
                  }
                  {...field}
                />
              )}
            />
          </InputsContainer>
          <PanelButtonsContainer>
            <Button
              text={"Add Race"}
              variant="Primary"
              type="button"
              size="large"
              onClick={() => {
                append({
                  id: fields.length.toString(),
                  name: "",
                  distance: 0,
                  time: "",
                  surface: "",
                  condition: "",
                  competitors: [],
                });
              }}
            />
          </PanelButtonsContainer>
          {fields.map((item, index) => (
            <Race
              key={index}
              raceIndex={index}
              raceRemove={remove}
              {...{ control }}
            />
          ))}
          <Footer>
            <Button
              text={t("form:inputs.delete")}
              variant="Danger"
              type="button"
              disabled={!!!context.entry?.id}
              onClick={() => {
                if (context.entry?.id) {
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
    </React.Fragment>
  );
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

const InputsContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
});

const PanelButtonsContainer = styled.div({
  marginTop: "0.8rem",
});

const Footer = styled.footer({
  paddingTop: "1rem",
  textAlign: "end",

  "& button:last-of-type": {
    marginLeft: "0.2rem",
  },
});

export default Detail;
