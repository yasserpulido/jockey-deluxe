import styled from "@emotion/styled";
import { colors } from "../theme/colors";

interface Props {
  label: string;
  variant: "Primary" | "Danger" | "Warning" | "Success";
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button = ({
  label,
  variant,
  disabled = false,
  type = "button",
}: Props) => {
  return (
    <BaseButton variant={variant} disabled={disabled} type={type}>
      {label}
    </BaseButton>
  );
};

type BaseButtonProps = {
  variant: string;
};

const BaseButton = styled.button<BaseButtonProps>(({ variant }) => ({
  padding: "0.5rem 2rem",
  border: "none",
  backgroundColor:
    variant === "Primary"
      ? colors.BlueDress
      : variant === "Danger"
      ? colors.PersianRed
      : variant === "Warning"
      ? colors.ArylideYellow
      : colors.GreenBlue,
  color: variant === "Warning" ? colors.Black : colors.White,
  fontSize: "1rem",
}));

export default Button;
