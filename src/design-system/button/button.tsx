import styled from "@emotion/styled";
import { colors } from "../theme/colors";

type Props = {
  text: string;
  variant: "primary" | "danger" | "warning" | "success" | "link";
  colorText?: "white" | "danger" | "black";
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: "medium" | "large";
  onClick?: () => void;
};

const Button = ({
  text,
  variant,
  colorText = "white",
  disabled = false,
  type = "button",
  size = "medium",
  onClick,
}: Props) => {
  return (
    <BaseButton
      variant={variant}
      colorText={colorText}
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
  colorText: string;
};

const BaseButton = styled.button<BaseButtonProps>(({ variant, size, colorText }) => ({
  backgroundColor:
    variant === "primary"
      ? colors.BlueDress
      : variant === "danger"
      ? colors.PersianRed
      : variant === "warning"
      ? colors.ArylideYellow
      : variant === "success"
      ? colors.GreenBlue
      : "transparent",
  border: "none",
  color:
    variant === "warning"
      ? colors.Black
      : variant === "link" && colorText === "danger"
      ? colors.PersianRed
      : variant === "link"
      ? colors.BlueDress
      : colors.White,
  cursor: "pointer",
  display: "inline-block",
  fontFamily: "inherit",
  fontSize: "1.2em",
  padding: variant === "link" ? 0 : "0.2rem 0.6rem",
  minWidth: variant === "link" ? 0 : "6rem",
  width: size === "large" ? "100%" : "auto",
  textDecoration: variant === "link" ? "underline" : "none",

  ":focus": {
    outline: `2px solid ${colors.DenimBlue}`,
  },

  "&:active": {
    backgroundColor:
      variant === "primary"
        ? colors.DenimBlue
        : variant === "danger"
        ? colors.Salmon
        : variant === "warning"
        ? colors.LightTan
        : variant === "link"
        ? "none"
        : colors.LightGreenishBlue,
    color:
      variant === "warning"
        ? colors.Black
        : variant === "link" && colorText === "danger"
        ? colors.Salmon
        : variant === "link"
        ? colors.BlueDress
        : colors.White,

    outline: 0,
  },

  "&:disabled": {
    backgroundColor: variant === "link" ? "none" : colors.FrenchGrey,
    color: variant === "link" ? colors.FrenchGrey : colors.White,
  },
}));

export default Button;
