import styled from "styled-components";

export const ButtonArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 50%;
  margin: 20px auto;
  grid-gap: 10px;
  @media (max-width: 768px) {
    max-width: 300px;
  }
`;
