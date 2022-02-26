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
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  z-index: 9;
  align-items: flex-end;
  & div.type {
    display: none !important;
  }

  & > div {
    width: 100%;
    height: unset;
    margin-top: unset;
    & > div {
      &:hover {
        box-shadow: unset;
        bottom: unset;
      }
      max-width: 100%;
      background: linear-gradient(
        to bottom,
        ${({ bg }) => (bg ? bg : "var(--ice)")} 23%,
        #fefefe 23%
      );
      & > img {
        width: 120px;
        height: 120px;
      }
      & > div {
        & > div {
          padding: 0 10px;
          justify-content: space-between;
          & p {
            font-size: 12px;
          }
          & > div {
            height: 7px;
          }
        }
      }
    }
  }
`;
