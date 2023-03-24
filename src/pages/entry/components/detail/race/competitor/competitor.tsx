import styled from "@emotion/styled";
import { t } from "i18next";
import { Control, Controller } from "react-hook-form";
import { Button, Dropdown, Panel } from "../../../../../../design-system";
import { Entry } from "../../../../../../types";

type Props = {
  competitorIndex: number;
  control: Control<Entry>;
  competitorRemove: (index: number) => void;
};

const Competitor = ({ competitorIndex, control, competitorRemove }: Props) => {
  return (
    <PanelContainer>
      <Panel title="Competitor">
        <Header>
          <Button
            variant="Link"
            text={"Delete"}
            onClick={() => {
              competitorRemove(competitorIndex);
            }}
          />
        </Header>
        <InputsContainer>
          <Controller
            control={control}
            name={`races.${competitorIndex}.competitors.${competitorIndex}.jockey`}
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
            name={`races.${competitorIndex}.competitors.${competitorIndex}.horse`}
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
