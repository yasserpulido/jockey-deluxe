import styled from "@emotion/styled";
import { colors } from "../theme/colors";

interface Props {
  text: string;
  variant: "Primary" | "Danger" | "Warning" | "Success";
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button = ({
  text,
  variant,
  disabled = false,
  type = "button",
}: Props) => {
  return (
    <BaseButton variant={variant} disabled={disabled} type={type}>
      {text}
    </BaseButton>
  );
};

type BaseButtonProps = {
  variant: string;
};

const BaseButton = styled.button<BaseButtonProps>(({ variant }) => ({
  backgroundColor:
    variant === "Primary"
      ? colors.BlueDress
      : variant === "Danger"
      ? colors.PersianRed
      : variant === "Warning"
      ? colors.ArylideYellow
      : colors.GreenBlue,
  border: "none",
  color: variant === "Warning" ? colors.Black : colors.White,
  cursor: "pointer",
  fontSize: "1rem",
  padding: "0.5rem 2rem",
  outline: 0,

  "&:active": {
    backgroundColor:
      variant === "Primary"
        ? colors.DenimBlue
        : variant === "Danger"
        ? colors.Salmon
        : variant === "Warning"
        ? colors.LightTan
        : colors.LightGreenishBlue,
  },
  "&:disabled": {
    backgroundColor: colors.FrenchGrey,
    color: colors.White,
  },
}));

export default Button;
