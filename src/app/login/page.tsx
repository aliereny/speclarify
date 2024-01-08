"use client";
import { Button, Form, Input, notification, Typography } from "antd";
import TextContent from "../../data/textContent.json";
import styles from "./LoginPage.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { Title, Paragraph, Text } = Typography;

  const { login } = useAuthStore();

  const router = useRouter();

  const onFinish = async (values: LoginFormData) => {
    try {
      const accessToken = await login(values.username, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      notification.error({
        message: "Login Failed",
        description: error?.message,
      });
    }
  };

  return (
    <main className={styles.loginMain}>
      <section className={styles.loginSection}>
        <Title className={styles.loginHeadline}>
          {TextContent.loginPage.headline}
        </Title>
        <Paragraph className={styles.loginSubHeadline}>
          {TextContent.loginPage.subHeadline}
        </Paragraph>
        <Form<LoginFormData>
          className={styles.loginForm}
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Form.Item<LoginFormData>
            label={TextContent.loginPage.formLabels.email}
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder={TextContent.loginPage.formPlaceholders.email} />
          </Form.Item>
          <Form.Item<LoginFormData>
            label={TextContent.loginPage.formLabels.password}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder={TextContent.loginPage.formPlaceholders.password}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              {TextContent.loginPage.formButtons.login}
            </Button>
          </Form.Item>
          <Paragraph>
            <Text className={styles.forgotPassword}>
              {TextContent.loginPage.formButtons.forgotPassword}
            </Text>
          </Paragraph>
        </Form>
        <Paragraph className={styles.signupPrompt}>
          {TextContent.loginPage.signupPrompt.text}{" "}
          <Text className={styles.signupLink}>
            {TextContent.loginPage.signupPrompt.linkText}
          </Text>
        </Paragraph>
      </section>
    </main>
  );
}
