import styled from "styled-components";

type ImgProps = {
  w?: string;
  h?: string;
  mw?: string;
  mh?: string;
  mg?: string;
};

interface PropsButton extends ImgProps {
  p?: string;
  bg?: string;
  color?: string;
}

export const PokeImgStyle = styled.img<ImgProps>`
  width: ${({ w }) => (w ? w : "64px")};
  height: ${({ h }) => (h ? h : "64px")};
  ${({ mw }) => mw && `max-width: ${mw}`};
  ${({ mh }) => mh && `max-height: ${mh}`};
  object-fit: contain;
  display: block;
`;

export const PokeGrid = styled.div<PropsSinglePoke>`
  max-width: 680px;
  display: grid;
  ${({ load }) =>
    load && "width: 50vw; padding: 3rem 0; justify-content: center;"}
  grid-template-columns: ${({ load }) =>
    load ? "1fr" : "repeat(4, minmax(100px, 150px))"};
  grid-gap: 20px;
  ${({ maxH }) => maxH && `max-height: ${maxH};`}
  ${({ maxH }) => maxH && `overflow-y: scroll;`}
  & .imgArea {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & > a {
    text-decoration: none;
    color: #0e0e0e;
  }
  & div.type {
    display: flex;
    justify-content: center;
    column-gap: 2px;
    flex-wrap: wrap;
  }
  & > div,
  & > a > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 10px 51px -5px rgb(183 189 193 / 30%);
    transition: all 0.2s;
    position: relative;
    padding: 10px;
    @media (max-width: 768px) {
      margin: 0 auto;
    }
    & h3 > span {
      font-weight: 300;
      font-style: italic;
      font-size: 80%;
    }
    & h3,
    & > div > h3 {
      text-transform: capitalize;
      color: #0e0e0e;
      font-size: 1rem;
      text-align: center;
    }
    &:hover {
      box-shadow: 0px 12px 40px -5px rgb(90 96 100 / 30%);
      bottom: 5px;
    }
    & .type {
      padding: 5px;
      border: 1px solid;
      border-radius: 5px;
      text-shadow: 1px 1px 1px #000;
      color: #fefefe;
      text-transform: capitalize;
      text-align: center;
      &.fire {
        background-color: #f44423;
      }
      &.water {
        background-color: #3c99ff;
      }
      &.grass {
        background-color: #77cc55;
      }
      &.electric {
        background-color: #f9cc34;
      }
      &.normal {
        background-color: #aaaa99;
      }
      &.fighting {
        background-color: #ba5545;
      }
      &.flying {
        background-color: #8899ff;
      }
      &.poison {
        background-color: #aa5599;
      }
      &.ground {
        background-color: #ddbb55;
      }
      &.rock {
        background-color: #bbaa66;
      }
      &.bug {
        background-color: #aabb22;
      }
      &.ghost {
        background-color: #6666bb;
      }
      &.steel {
        background-color: #aaaabb;
      }
      &.fairy {
        background-color: #ee99ee;
      }
      &.psychic {
        background-color: #ff7777;
      }
      &.dragon {
        background-color: #7777ff;
      }
      &.dark {
        background-color: #777777;
      }
      &.ice {
        background-color: #99ccff;
      }
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    width: 80%;
    margin: 0 auto;
    height: 50vh;
    ${({ load }) =>
      load &&
      `
      grid-template-columns: 1fr !important;
      width: 100%;
      & > div {
        height: 100%;
        width: 100%;
      }
    `}
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, minmax(100px, 30%));
    justify-content: center;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(100px, 40%));
  }
`;

type PropsSinglePoke = {
  wBf?: string;
  maxH?: string;
  load?: boolean;
};

export const StatusPoke = styled.div<PropsSinglePoke>`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  & p {
    display: inline-flex;
    text-transform: uppercase;
  }
  & > div {
    max-width: 256px;
    width: 100%;
    background-color: #ccc;
    border-radius: 5px;
    position: relative;
    height: 7px;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: ${({ wBf }) => (wBf ? `${+wBf}px` : "0%")};
      height: 100%;
      background: #ff0000;
      transition: animation 0.5s linear;
      animation: progress 3s both;
      animation-delay: 0.3s;
      @keyframes progress {
        from {
          width: 0%;
        }
      }
    }
  }
`;

export const SinglePoke = styled(PokeGrid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: unset;
  margin: 3rem auto 0 auto;
  width: 100%;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  & .conj {
    position: absolute;
    top: 10px;
    right: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    gap: 10px;
    @media (max-width: 768px) {
      display: flex;
      gap: 0;
      flex-wrap: wrap;
      row-gap: 10px;
      position: unset;
      justify-content: space-evenly;
    }
  }
  &::webkit-scrollbar-track {
    background: blue;
  }
  & > div {
    width: 100%;
    row-gap: 15px;
    padding: 20px 0;
    @media (max-width: 768px) {
      padding-bottom: 120px;
    }
    & .types {
      display: flex;
      justify-content: center;
      column-gap: 5px;
    }
    & .abilities {
      display: flex;
      list-style: none;
      position: relative;
      width: 120px;
      &:hover li:not(:first-child) {
        opacity: 1;
        pointer-events: initial;
        z-index: 9999;
        width: 120%;
      }
      &:hover li:first-child.more::after {
        border-color: #fefefe transparent transparent transparent;
      }
      & li {
        text-transform: capitalize;
        text-align: center;
        padding: 3px;
        width: 100%;
        background: var(--fire);
        color: #fefefe;
        word-break: break-word;
      }
      & li:first-child {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      & li:first-child.more::after {
        content: "";
        border: 5px solid;
        border-color: transparent transparent transparent #fefefe;
        display: inline-block;
        margin-left: 3px;
        transition: border-color 0.2s linear;
      }
      & li:not(:first-child) {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        border-top: 1px solid #fefefe;
        background: var(--ghost);
        transition: all 0.2s;
      }
    }
    & .status {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 15px;
      padding: 10px 0;
    }
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const PokeButton = styled.button<PropsButton>`
  width: ${({ w }) => w && w};
  height: ${({ h }) => h && h};
  padding: ${({ p }) => (p ? p : "10px")};
  ${({ mw }) => mw && `max-width: ${mw}`};
  ${({ mh }) => mh && `max-height: ${mh}`};
  ${({ mg }) => mg && `margin: ${mg}`};
  background-color: ${({ bg }) => (bg ? `var(--${bg})` : "var(--fire)")};
  color: ${({ color }) => (color ? `var(--${color})` : "#fefefe")};
  text-shadow: 1px 1px 1px #0e0e0e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
  &[disabled] {
    filter: brightness(0.75);
    cursor: not-allowed;
    pointer-events: none;
    color: #fefefe;
  }
`;
