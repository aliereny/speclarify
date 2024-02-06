"use client";
import { Button, Menu } from "antd";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  AimOutlined,
  BarsOutlined,
  BookOutlined,
  DeleteRowOutlined,
  FileExcelOutlined,
  KeyOutlined,
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuItemType } from "antd/es/menu/hooks/useItems";

export const ProfileNav = () => {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      style={{
        width: collapsed ? undefined : 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        theme="light"
        mode={"inline"}
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: `/profile`,
            label: <Link href={`/profile`}>Profile</Link>,
            icon: <UserOutlined />,
          },
          {
            key: `/profile/change-password`,
            label: (
              <Link href={`/profile/change-password`}>Change Password</Link>
            ),
            icon: <KeyOutlined />,
          },
        ]}
        inlineCollapsed={collapsed}
      />
    </div>
  );
};
