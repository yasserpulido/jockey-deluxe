import styled from "@emotion/styled";
import { t } from "i18next";
import { Control, Controller } from "react-hook-form";
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  Panel,
} from "../../../../../../design-system";
import { Entry } from "../../../../../../types";

type Props = {
  raceIndex: number;
  competitorIndex: number;
  control: Control<Entry>;
  competitorRemove: (index: number) => void;
};

const Competitor = ({
  raceIndex,
  competitorIndex,
  control,
  competitorRemove,
}: Props) => {
  return (
    <PanelContainer>
      <Panel title="Competitor">
        <Header>
          <Button
            variant="link"
            text={"Delete"}
            onClick={() => {
              competitorRemove(competitorIndex);
            }}
            colorText="danger"
          />
        </Header>
        <InputsContainer>
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.jockey`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Jockey"
                options={[]}
                errors={errors.place?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.horse`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Horse"
                options={[]}
                errors={errors.place?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.number`}
            defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <InputNumber
                label="Number"
                errors={errors.name?.message}
                min={0}
                step={1}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.position`}
            defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <InputNumber
                label="Position"
                errors={errors.name?.message}
                min={0}
                step={1}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.stud`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Stud"
                options={[]}
                errors={errors.place?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.trainer`}
            defaultValue=""
            render={({ field, formState: { errors } }) => (
              <Dropdown
                label="Trainer"
                options={[]}
                errors={errors.place?.message}
                placeholder={t("form:placeholders.general_dropdown") as string}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.jockeyWeight`}
            defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <InputNumber
                label="J. Weight"
                errors={errors.name?.message}
                min={0}
                step={1}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.horseWeight`}
            defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <InputNumber
                label="H. Weight"
                errors={errors.name?.message}
                min={0}
                step={1}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={`races.${raceIndex}.competitors.${competitorIndex}.odds`}
            defaultValue={0}
            render={({ field, formState: { errors } }) => (
              <InputNumber
                label="Odds"
                errors={errors.name?.message}
                min={0}
                step={0.01}
                {...field}
              />
            )}
          />
        </InputsContainer>
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

export default Competitor;
