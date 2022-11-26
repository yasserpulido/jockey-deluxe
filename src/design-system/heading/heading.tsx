import styled from "@emotion/styled";

type Props = {
  text: string;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Heading = ({ text, size }: Props) => {
  switch (size) {
    case "h1":
      return <Header1>{text}</Header1>;
    case "h2":
      return <Header2>{text}</Header2>;
    case "h3":
      return <Header3>{text}</Header3>;
    case "h4":
      return <Header4>{text}</Header4>;
    case "h5":
      return <Header5>{text}</Header5>;
    case "h6":
      return <Header6>{text}</Header6>;
  }
};

const Header1 = styled.h1({
  fontSize: "2.5rem",
});

const Header2 = styled.h2({
  fontSize: "2rem",
});

const Header3 = styled.h3({
  fontSize: "1.75rem",
});

const Header4 = styled.h4({
  fontSize: "1.5rem",
});

const Header5 = styled.h5({
  fontSize: "1.25rem",
});

const Header6 = styled.h6({
  fontSize: "1rem",
});

export default Heading;
