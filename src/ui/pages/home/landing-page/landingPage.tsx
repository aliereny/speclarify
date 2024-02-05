"use client";
import Image from "next/image";
import { Button, Flex, Typography } from "antd";
import {
  LandingPageStyled,
  StyledSection,
  StyledHero,
  StyledHeroImage,
  StyledTestimonials,
  StyledCTABanner,
  StyledTestimonial,
} from "@/ui/pages/home/landing-page/landingPage.styled";

export const LandingPage = () => {
  return (
    <LandingPageStyled>
      {/* Hero Section */}
      <StyledHero>
        <StyledHeroImage
          src={"/business-technology-and-people-concept-creative.jpg"}
          alt={"business-technology-and-people-concept-creative"}
          fill
        />
        <Typography.Title className={"soft-white"}>
          {"Transforming Software Requirements with AI"}
        </Typography.Title>
        <Typography.Title level={3} className={"soft-white"}>
          {
            "Enhance clarity, efficiency, and precision in your software development process."
          }
        </Typography.Title>
        <Button
          type={"primary"}
          size={"large"}
          className={"soft-white"}
          href={"/signin"}
        >
          {"Get Started"}
        </Button>
      </StyledHero>

      {/* Features Section */}
      <StyledSection>
        <Typography.Title level={1}>{"Why Speclarify?"}</Typography.Title>
        <Flex vertical>
          <Typography.Title level={3}>{"Duplicate Detection"}</Typography.Title>
          <Typography.Paragraph>
            {
              "Automatically identify and eliminate duplicate requirements for streamlined project planning."
            }
          </Typography.Paragraph>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>
            {"Ambiguity Resolution"}
          </Typography.Title>
          <Typography.Paragraph>
            {
              "Pinpoint and clarify ambiguous requirements, ensuring clear project objectives and deliverables."
            }
          </Typography.Paragraph>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>{"Prioritization Aid"}</Typography.Title>
          <Typography.Paragraph>
            {
              "Efficiently prioritize requirements based on project goals and stakeholder inputs."
            }
          </Typography.Paragraph>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>
            {"Requirement Classification"}
          </Typography.Title>
          <Typography.Paragraph>
            {
              "Classify and organize requirements for better management and execution."
            }
          </Typography.Paragraph>
        </Flex>
      </StyledSection>

      {/* How It Works Section */}
      <StyledSection>
        <Typography.Title level={1}>
          {"Simplify Your Software Engineering Process"}
        </Typography.Title>
        <Flex vertical>
          <Typography.Title level={3}>
            {"Upload your SRS Document"}
          </Typography.Title>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>{"AI-Powered Analysis"}</Typography.Title>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>
            {"Review and Implement Suggestions"}
          </Typography.Title>
        </Flex>
      </StyledSection>

      {/* Benefits Section */}
      <StyledSection>
        <Typography.Title level={1}>
          {"Streamline Your Development with SpeClarify"}
        </Typography.Title>
        <Typography.Paragraph>{"Save Time and Resources"}</Typography.Paragraph>
        <Typography.Paragraph>
          {"Enhance Project Accuracy"}
        </Typography.Paragraph>
        <Typography.Paragraph>
          {"Improve Overall Project Outcomes"}
        </Typography.Paragraph>
      </StyledSection>

      {/* Testimonials Section */}
      <StyledTestimonials>
        <Typography.Title level={1}>
          {"Trusted by Software Professionals"}
        </Typography.Title>
        <StyledTestimonial>
          <Typography.Paragraph>
            {
              '"SpeClarify revolutionized how we handle project requirements. It\'s a game-changer!"'
            }
          </Typography.Paragraph>
          <Typography.Text strong>
            {"Jane Doe, Project Manager"}
          </Typography.Text>
        </StyledTestimonial>
        <StyledTestimonial>
          <Typography.Paragraph>
            {
              '"The precision and efficiency of SpeClarify have significantly improved our development process."'
            }
          </Typography.Paragraph>
          <Typography.Text strong>
            {"John Smith, Lead Developer"}
          </Typography.Text>
        </StyledTestimonial>
      </StyledTestimonials>

      {/* CTA Banner */}
      <StyledCTABanner>
        <Typography.Title level={2}>
          {"Ready to Enhance Your Software Engineering Process?"}
        </Typography.Title>
        <Button type={"primary"} size={"large"}>
          {"Discover"}
        </Button>
      </StyledCTABanner>
    </LandingPageStyled>
  );
};
