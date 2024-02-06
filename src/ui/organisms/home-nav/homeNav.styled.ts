import styled from "styled-components";
import { Button } from "antd";

export const StyledHomeNav = styled.nav<{
  scrolled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  background-color: transparent;
  transition: all 0.3s;
  z-index: 1000;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;

  & button {
    background-color: #fff;
    color: #000;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    box-shadow: none;
    border-radius: 2rem;
  }

  ${({ scrolled, theme }) =>
    scrolled &&
    `
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        & button {
          background-color: #32b98e;
            color: #fff;
        }
    `}
`;

export const StyledHomeNavLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledNavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const StyledNavItem = styled(Button)``;
