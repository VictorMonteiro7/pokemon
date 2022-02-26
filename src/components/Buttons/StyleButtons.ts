import styled from "styled-components";

type ButtonAreaProps = {
  hasType?: boolean;
};

export const ButtonArea = styled.div<ButtonAreaProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 50%;
  margin: 20px auto;
  grid-gap: 10px;
  ${({ hasType }) => hasType && "grid-template-columns: repeat(3, 1fr);"}
  @media (max-width: 768px) {
    max-width: 300px;
  }
`;
