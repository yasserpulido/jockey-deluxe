import styled from "@emotion/styled";
import { t } from "i18next";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Button, Dropdown, Input, Panel } from "../../../../../design-system";
import { Entry } from "../../../../../types";
import { Competitor } from "./competitor";

type Props = {
  control: Control<Entry>;
  raceIndex: number;
  raceRemove: (index: number) => void;
};

const Race = ({ raceIndex, control, raceRemove }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `races.${raceIndex}.competitors`,
  });

  return (
    <PanelContainer>
      <Panel title="Race">
        <Header>
          <Button
            variant="link"
            text={"Delete"}
            onClick={() => {
              raceRemove(raceIndex);
            }}
            colorText="danger"
          />
        </Header>
        <InputsContainer>
          <Controller
            control={control}
            name={`races.${raceIndex}.name`}
            defaultValue=""
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
            name={`races.${raceIndex}.distance`}
            defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <Input
                label="Distance"
                errors={errors.name?.message}
                type="number"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.time`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Input
                label="Time"
                errors={errors.name?.message}
                type="time"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.surface`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Surface"
                options={[]}
                errors={errors.place?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.condition`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Condition"
                options={[]}
                errors={errors.place?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
        </InputsContainer>
        <PanelButtonsContainer>
          <Button
            text={"Add Competitors"}
            variant="primary"
            type="button"
            size="large"
            onClick={() => {
              append({
                id: fields.length.toString(),
                horse: "",
                jockey: "",
                number: 0,
                position: 0,
                stud: "",
                trainer: "",
                jockeyWeight: 0,
                horseWeight: 0,
                odds: 0,
              });
            }}
          />
        </PanelButtonsContainer>
        {fields.map((item, index) => (
          <Competitor
            key={index}
            raceIndex={raceIndex}
            competitorIndex={index}
            competitorRemove={remove}
            {...{ control }}
          />
        ))}
      </Panel>
    </PanelContainer>
  );
};

const Header = styled.div({
  textAlign: "end",
});

const InputsContainer = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1rem",
});

const PanelContainer = styled.div({
  marginTop: "1rem",
});

const PanelButtonsContainer = styled.div({
  marginTop: "0.8rem",
});

export default Race;
