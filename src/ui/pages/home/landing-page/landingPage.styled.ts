import styled from "styled-components";
import Image from "next/image";

export const LandingPageStyled = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledHero = styled.div`
  width: 100%;
  aspect-ratio: 1.64;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledHeroImage = styled(Image)`
  position: absolute;
  z-index: -1;
  mix-blend-mode: multiply;
`;

export const StyledSection = styled.section`
  width: 100%;
  padding: 20px;
  text-align: center;
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
