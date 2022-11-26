import styled from "@emotion/styled";
import { colors } from "../theme/colors";

const Card = () => {
  return (
    <Container>
      <Header>Title</Header>
      <Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        quibusdam totam laboriosam consequuntur omnis ex odit, non veritatis
        modi maiores fuga perferendis numquam nemo dolores distinctio veniam
        soluta, atque accusamus?
      </Content>
    </Container>
  );
};

const Container = styled.div({
  border: `1px solid ${colors.DoveGrey}`,
});

const Header = styled.div({
  backgroundColor: colors.DoveGrey,
  color: colors.White,
  textAlign: "center",
  padding: "0.5rem 0",
});

const Content = styled.div({
  padding: "1rem",
});
export default Card;
