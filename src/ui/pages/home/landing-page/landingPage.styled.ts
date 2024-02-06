import styled from "styled-components";
import Image from "next/image";
import { Button } from "antd";

export const LandingPageStyled = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledHero = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
`;

export const StyledHeroImage = styled(Image)`
  position: absolute;
  z-index: -1;
  mix-blend-mode: multiply;
`;

export const StyledSection = styled.section`
  width: 100%;
  padding: 2rem;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`;

export const StyledWhySpeclarify = styled(StyledSection)`
  text-align: start;
  & span {
    font-size: 2rem;
  }
`;

export const StyledHowItWorks = styled(StyledSection)`
  background-color: #32b98e;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  svg {
    color: white;
  }
`;

export const StyledTestimonials = styled(StyledSection)`
  background-color: #f0f2f5;
`;

export const StyledCTABanner = styled(StyledSection)`
  background-color: #e6f7ff;
  padding: 20px;
  margin-top: 20px;
`;

export const StyledTestimonial = styled.div`
  margin: 10px 0;
`;

export const StyledHeroButton = styled(Button)`
  background-color: #32b98e;
  border-radius: 2rem;
  font-weight: 500;
`;
