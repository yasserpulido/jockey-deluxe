import styled from "@emotion/styled";
import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, colors, Dropdown, Input } from "../../../../design-system";
import { Common } from "../../../../providers";
import { ModalFooter, Track } from "../../../../types";
import { TrackProvider } from "../../providers";

const Detail = () => {
  const { t } = useTranslation(["track", "form"]);
  const [showModal, setShowModal] = useState(false);
  const [modalFooter, setModalFooter] = useState<ModalFooter>({
    header: "",
    content: "",
    onClick: () => {},
  });
  const common = useContext(Common.Context);
  const context = useContext<TrackProvider.TrackContextType>(
    TrackProvider.Context
  );
  const { control, handleSubmit, reset, getValues } = useForm<Track>({
    defaultValues: context.track,
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
    reset(context.track);
  }, [reset, context]);

  const onSubmit: SubmitHandler<Track> = (data) => {
    context.save(data);
  };

  const saveHandler = () => {
    context.save(getValues());
    setShowModal(false);
  };

  const deleteHandler = () => {
    if (context.track) {
      context.delete(context.track.id);
    }
    setShowModal(false);
  };

  const resetHandler = () => {
    reset(context.track);
    if (context.track?.id?.length > 0) {
      context.reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <Legend>{t("track:labels.form_title")}</Legend>
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
                message: t("track:errors.name"),
              },
              minLength: {
                value: 3,
                message: t("track:errors.name_min"),
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Input
                label={t("track:labels.name")}
                errors={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: t("track:errors.country"),
              },
            }}
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label={t("track:labels.country")}
                options={common.country.data}
                errors={errors.country?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
        </InputsContainer>
        <Footer>
          <Button
            text={t("form:inputs.delete")}
            variant="Danger"
            type="button"
            disabled={!!!context.track?.id}
            onClick={() => {
              if (context.track?.id) {
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
