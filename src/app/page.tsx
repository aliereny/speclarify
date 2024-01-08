"use client";
import Image from "next/image";
import { Button, Flex, Typography } from "antd";
import TextContent from "../data/textContent.json";
import styles from "./page.module.scss";
import { Navbar } from "@/ui/organisms/navbar/navbar";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Navbar />
        <Image
          src={"/business-technology-and-people-concept-creative.jpg"}
          alt={"business-technology-and-people-concept-creative"}
          fill
          className={styles.heroImage}
        />
        <Typography.Title className={"soft-white"}>
          {TextContent.homePage.heroSection.mainHeadline}
        </Typography.Title>
        <Typography.Title level={3} className={"soft-white"}>
          {TextContent.homePage.heroSection.subHeadline}
        </Typography.Title>
        <Button type={"primary"} size={"large"} className={"soft-white"}>
          {TextContent.homePage.heroSection.buttonText}
        </Button>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <Typography.Title level={1}>
          {TextContent.homePage.featuresOverview.headline}
        </Typography.Title>
        <Flex vertical>
          <Typography.Title level={3}>
            {TextContent.homePage.featuresOverview.features[0].title}
          </Typography.Title>
          <Typography.Paragraph>
            {TextContent.homePage.featuresOverview.features[0].description}
          </Typography.Paragraph>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>
            {TextContent.homePage.featuresOverview.features[1].title}
          </Typography.Title>
          <Typography.Paragraph>
            {TextContent.homePage.featuresOverview.features[1].description}
          </Typography.Paragraph>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>
            {TextContent.homePage.featuresOverview.features[2].title}
          </Typography.Title>
          <Typography.Paragraph>
            {TextContent.homePage.featuresOverview.features[2].description}
          </Typography.Paragraph>
        </Flex>
        <Flex vertical>
          <Typography.Title level={3}>
            {TextContent.homePage.featuresOverview.features[3].title}
          </Typography.Title>
          <Typography.Paragraph>
            {TextContent.homePage.featuresOverview.features[3].description}
          </Typography.Paragraph>
        </Flex>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <Typography.Title level={1}>
          {TextContent.homePage.howItWorks.headline}
        </Typography.Title>
        {TextContent.homePage.howItWorks.steps.map((step, index) => (
          <Flex key={index} vertical>
            <Typography.Title level={3}>{step}</Typography.Title>
          </Flex>
        ))}
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <Typography.Title level={1}>
          {TextContent.homePage.benefitsSection.headline}
        </Typography.Title>
        {TextContent.homePage.benefitsSection.benefits.map((benefit, index) => (
          <Typography.Paragraph key={index}>{benefit}</Typography.Paragraph>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <Typography.Title level={1}>
          {TextContent.homePage.testimonials.headline}
        </Typography.Title>
        {TextContent.homePage.testimonials.testimonials.map(
          (testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <Typography.Paragraph>"{testimonial.quote}"</Typography.Paragraph>
              <Typography.Text strong>{testimonial.author}</Typography.Text>
            </div>
          ),
        )}
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <Typography.Title level={2}>
          {TextContent.homePage.ctaBanner.text}
        </Typography.Title>
        <Button type={"primary"} size={"large"}>
          {TextContent.homePage.ctaBanner.buttonText}
        </Button>
      </section>
    </main>
  );
}
