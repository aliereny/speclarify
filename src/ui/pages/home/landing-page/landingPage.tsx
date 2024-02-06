"use client";
import { Button, Col, Flex, Row, Space, Typography } from "antd";
import {
  LandingPageStyled,
  StyledCTABanner,
  StyledHero,
  StyledHeroButton,
  StyledHeroImage,
  StyledHowItWorks,
  StyledSection,
  StyledTestimonial,
  StyledTestimonials,
  StyledWhySpeclarify,
} from "@/ui/pages/home/landing-page/landingPage.styled";
import { HomeNav } from "@/ui/organisms/home-nav/homeNav";
import React from "react";
import {
  CheckOutlined,
  CommentOutlined,
  InteractionOutlined,
  ScheduleOutlined,
  SignatureOutlined,
} from "@ant-design/icons";

export const LandingPage = () => {
  return (
    <LandingPageStyled>
      <HomeNav />
      {/* Hero Section */}
      <StyledHero>
        <StyledHeroImage
          src={"/business-technology-and-people-concept-creative.jpg"}
          alt={"business-technology-and-people-concept-creative"}
          objectFit={"cover"}
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
        <StyledHeroButton
          type={"primary"}
          size={"large"}
          className={"soft-white"}
          href={"/signin"}
        >
          {"Get Started"}
        </StyledHeroButton>
      </StyledHero>

      {/* Features Section */}
      <StyledWhySpeclarify>
        <Typography.Title
          level={1}
          style={{
            color: "#32b98e",
          }}
        >
          {"Why Speclarify?"}
        </Typography.Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Flex vertical gap={8}>
              <Space align={"center"}>
                <InteractionOutlined />
                <Typography.Title level={3}>
                  {"Duplicate Detection"}
                </Typography.Title>
              </Space>
              <Typography.Paragraph>
                {
                  "Automatically identify and eliminate duplicate requirements for streamlined project planning."
                }
              </Typography.Paragraph>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Flex vertical gap={8}>
              <Space align={"center"}>
                <CommentOutlined />
                <Typography.Title level={3}>
                  {"Ambiguity Resolution"}
                </Typography.Title>
              </Space>
              <Typography.Paragraph>
                {
                  "Pinpoint and clarify ambiguous requirements, ensuring clear project objectives and deliverables."
                }
              </Typography.Paragraph>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Flex vertical gap={8}>
              <Space align={"center"}>
                <SignatureOutlined />
                <Typography.Title level={3}>
                  {"Prioritization Aid"}
                </Typography.Title>
              </Space>
              <Typography.Paragraph>
                {
                  "Efficiently prioritize requirements based on project goals and stakeholder inputs."
                }
              </Typography.Paragraph>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Flex vertical gap={8}>
              <Space align={"center"}>
                <ScheduleOutlined />
                <Typography.Title level={3}>
                  {"Requirement Classification"}
                </Typography.Title>
              </Space>
              <Typography.Paragraph>
                {
                  "Classify and organize requirements for better management and execution."
                }
              </Typography.Paragraph>
            </Flex>
          </Col>
        </Row>
      </StyledWhySpeclarify>

      {/* How It Works Section */}
      <StyledHowItWorks>
        <Typography.Title level={1}>
          {"Simplify Your Software Engineering Process"}
        </Typography.Title>
        <Flex gap={16}>
          <CheckOutlined />
          <Typography.Title level={3}>
            {"Upload your SRS Document"}
          </Typography.Title>
        </Flex>
        <Flex gap={16}>
          <CheckOutlined />
          <Typography.Title level={3}>{"AI-Powered Analysis"}</Typography.Title>
        </Flex>
        <Flex gap={16}>
          <CheckOutlined />
          <Typography.Title level={3}>
            {"Review and Implement Suggestions"}
          </Typography.Title>
        </Flex>
      </StyledHowItWorks>

      {/*  Benefits Section
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

       Testimonials Section
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
      </StyledTestimonials>*/}

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
