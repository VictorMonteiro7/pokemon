import styled from "styled-components";

export type PropsPokeballType = {
  wt?: string;
  ht?: string;
  bd?: string;
  an?: boolean;
};

export const PokeBallWrapper = styled.div<PropsPokeballType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ wt }) => (wt ? wt : "300px")};
  height: ${({ ht }) => (ht ? ht : "300px")};
  position: relative;
  & > p {
    position: absolute;
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
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background: #000;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border: 2px solid #000;
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
      border: 0.625em solid #000;
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
    width: ${({ wt }) => (wt ? wt : "200px")};
    height: ${({ ht }) => (ht ? ht : "200px")};
    margin: 0 auto;
  }
  @media (max-width: 576px) {
    width: ${({ wt }) => (wt ? wt : "150px")};
    height: ${({ ht }) => (ht ? ht : "150px")};
  }
  @media (max-width: 480px) {
    width: ${({ wt }) => (wt ? wt : "100px")};
    height: ${({ ht }) => (ht ? ht : "100px")};
  }
`;
