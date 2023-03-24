import styled from "@emotion/styled";
import { colors } from "../theme/colors";

type Props = {
  text: string;
  variant: "Primary" | "Danger" | "Warning" | "Success" | "Link";
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: "medium" | "large";
  onClick?: () => void;
};

const Button = ({
  text,
  variant,
  disabled = false,
  type = "button",
  size = "medium",
  onClick,
}: Props) => {
  return (
    <BaseButton
      variant={variant}
      disabled={disabled}
      type={type}
      size={size}
      onClick={onClick}
    >
      {text}
    </BaseButton>
  );
};

type BaseButtonProps = {
  variant: string;
  size: string;
};

const BaseButton = styled.button<BaseButtonProps>(({ variant, size }) => ({
  backgroundColor:
    variant === "Primary"
      ? colors.BlueDress
      : variant === "Danger"
      ? colors.PersianRed
      : variant === "Warning"
      ? colors.ArylideYellow
      : variant === "Success"
      ? colors.GreenBlue
      : "transparent",
  border: "none",
  color:
    variant === "Warning"
      ? colors.Black
      : variant === "Link"
      ? colors.BlueDress
      : colors.White,
  cursor: "pointer",
  display: "inline-block",
  fontFamily: "inherit",
  fontSize: "1.2em",
  padding: variant === "Link" ? 0 : "0.2rem 0.6rem",
  minWidth: variant === "Link" ? 0 : "6rem",
  width: size === "large" ? "100%" : "auto",
  textDecoration: variant === "Link" ? "underline" : "none",

  ":focus": {
    outline: `2px solid ${colors.DenimBlue}`,
  },

  "&:active": {
    backgroundColor:
      variant === "Primary"
        ? colors.DenimBlue
        : variant === "Danger"
        ? colors.Salmon
        : variant === "Warning"
        ? colors.LightTan
        : variant === "Link"
        ? "none"
        : colors.LightGreenishBlue,
    color:
      variant === "Warning"
        ? colors.Black
        : variant === "Link"
        ? colors.DenimBlue
        : colors.White,

    outline: 0,
  },

  "&:disabled": {
    backgroundColor: variant === "Link" ? "none" : colors.FrenchGrey,
    color: variant === "Link" ? colors.FrenchGrey : colors.White,
  },
}));

export default Button;
