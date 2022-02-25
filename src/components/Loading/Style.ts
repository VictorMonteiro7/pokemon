import styled from "styled-components";

export type PropsPokeballType = {
  wt?: string;
  wtpb?: string;
  ht?: string;
  htpb?: string;
  bd?: string;
  an?: boolean;
  sm?: boolean;
  mg?: string;
  loading?: boolean;
};

export const PokeBallWrapper = styled.div<PropsPokeballType>`
  display: ${({ sm }) => (sm ? "inline-flex" : "flex")};
  flex-direction: ${({ sm }) => (sm ? "row" : "column")};
  align-items: center;
  ${({ sm }) => sm && "justify-content: center;"}
  ${({ loading }) => loading && "width: 100%; height: 100%;"}
  ${({ wt }) => (wt ? `width: ${wt}` : "300px")};
  ${({ ht }) => (ht ? `height: ${ht}` : "300px")};
  position: relative;
  & > p {
    ${({ an }) => an && "position: absolute;"}
    font-size: 1rem;
    text-transform: uppercase;
    color: #000;
    opacity: 1;
    bottom: -2rem;
    font-weight: 700;
    ${({ an }) => an && "animation: blink 2s infinite;"}
  }
  & > .pokeBall {
    font-size: 10px;
    width: ${({ wtpb }) => (wtpb ? wtpb : "300px")};
    height: ${({ htpb }) => (htpb ? htpb : "300px")};
    border-radius: 50%;
    background: #000;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border: 2px solid #000;
    ${({ mg }) => mg && `margin: ${mg};`}
    ${({ an }) => an && "animation: rotatePokeball 1s infinite;"}
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      height: 47%;
      top: 0;
      background: #ff0000;
    }
    &::after {
      transform: rotate(180deg);
      background: #fff;
      bottom: 0;
      top: unset;
    }
    & > div {
      width: 20%;
      height: 20%;
      border-radius: 50%;
      border: ${({ bd }) => (bd ? `${bd}` : "0.625em solid #000")};
      background: #fff;
      z-index: 9;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        width: 50%;
        height: 50%;
        border: 1px solid #000;
      }
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    height: ${({ sm }) => (sm ? "24px" : "200px")};
    margin: 0 auto;
    & .pokeball {
      width: ${({ sm }) => (sm ? "24px" : "200px")};
      height: ${({ sm }) => (sm ? "24px" : "200px")};
    }
  }
  @media (max-width: 576px) {
    height: ${({ sm }) => (sm ? "24px" : "150px")};
    & .pokeBall {
      width: ${({ sm }) => (sm ? "24px" : "150px")};
      height: ${({ sm }) => (sm ? "24px" : "150px")};
    }
  }
  @media (max-width: 480px) {
    height: ${({ sm }) => (sm ? "24px" : "100px")};
    & .pokeBall {
      width: ${({ sm }) => (sm ? "24px" : "100px")};
      height: ${({ sm }) => (sm ? "24px" : "100px")};
    }
  }
`;
