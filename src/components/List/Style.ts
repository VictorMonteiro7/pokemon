import styled from "styled-components";

export const ListStyle = styled.ul`
  max-width: 300px;
  margin: 0 auto;
  padding: 0 5px;
  background-color: var(--fire);
  width: 100%;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  color: #fefefe;
  outline: none;
  text-transform: capitalize;
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
  position: relative;
  list-stile: none;
  transition: all 0.3s ease-in-out;
  & > li {
    cursor: pointer;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    &:hover:after {
      transform: rotate(90deg) translate(5px, 5px);
    }
    &:after {
      content: "";
      position: absolute;
      border: 10px solid;
      border-color: transparent transparent transparent #0e0e0e;
      right: 0;
      transition: all 0.3s ease-in-out;
    }
  }
  &:hover > ul {
    opacity: 1;
    pointer-events: all;
  }
  & > ul {
    list-style: none;
    position: absolute;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: var(--fire);
    top: 45px;
    z-index: 100;
    border-radius: 5px;
    padding: 0 0 5px 0;
    display: flex;
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    & > li {
      padding: 8px 0;
      border-top: 1px solid #fefefe;
      cursor: pointer;
      width: 100%;
      display: block;
      transition: 0.3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: var(--ice);
      }
    }
  }
`;
