import styled from "styled-components";

type ModalProps = {
  bg?: string;
};

export const ModalContainer = styled.div<ModalProps>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  z-index: 9;

  & div.type {
    display: none !important;
  }

  & > div {
    width: 100%;
    max-width: 50%;
    @media (max-width: 768px) {
      max-width: 80%;
    }
    & > div {
      max-width: 80%;
      margin-top: 13rem;
      @media (max-width: 768px) {
        max-width: 100%;
        background: linear-gradient(
          to bottom,
          ${({ bg }) => (bg ? bg : "var(--ice)")} 23%,
          #fefefe 23%
        );
        & > img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
`;
