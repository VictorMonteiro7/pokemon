import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  & > input {
    width: 300px;
    height: 48px;
    border-radius: 4px;
    border: none;
    background: var(--ghost);
    padding-left: 5px;
    color: #fefefe;
    font-weight: bold;
    font-size: 14px;
    outline: none;
    &::placeholder {
      color: #fefefe;
      font-weight: bold;
    }
  }
  & > div {
    position: absolute;
    height: 100%;
    right: 0;
    width: unset;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;
