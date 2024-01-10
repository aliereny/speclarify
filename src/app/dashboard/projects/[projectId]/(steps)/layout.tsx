"use client";
import { Divider, Flex, MenuProps, Steps, theme } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./StepsLayout.module.scss";

const items: MenuProps["items"] = [
  {
    key: "dashboard",
    label: "Projects",
  },
  {
    key: "dashboard/settings",
    label: "Settings",
  },
];

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const { token } = theme.useToken();

  const [current, setCurrent] = useState(0);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const index = routes.findIndex((route) => route === pathname);
    setCurrent(index);
  }, [pathname]);

  const routes = [
    `/dashboard/projects/${params.projectId}/upload`,
    `/dashboard/projects/${params.projectId}/review`,
    `/dashboard/projects/${params.projectId}/remove-duplicates`,
    `/dashboard/projects/${params.projectId}/fix-ambiguities`,
    `/dashboard/projects/${params.projectId}/prioritize`,
    `/dashboard/projects/${params.projectId}/classify`,
    `/dashboard/projects/${params.projectId}/export`,
  ];

  const onChange = (value: number) => {
    setCurrent(value);
    router.push(routes[value]);
  };

  return (
    <Flex className={styles.wrapper} gap={16}>
      <div>
        <Steps
          size={"small"}
          style={{ width: "auto" }}
          current={current}
          onChange={onChange}
          direction="vertical"
          items={[
            {
              title: "Upload a file",
            },
            {
              title: "Review requirements",
            },
            {
              title: "Remove duplicates",
            },
            {
              title: "Fix ambiguities",
            },
            {
              title: "Prioritize",
            },
            {
              title: "Classify",
            },
            {
              title: "Export",
            },
          ]}
        />
      </div>
      <Divider type={"vertical"} style={{ height: "100%" }} />
      {children}
    </Flex>
  );
}