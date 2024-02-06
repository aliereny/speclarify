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
  LineChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuItemType } from "antd/es/menu/hooks/useItems";

export const AppNav = () => {
  const pathname = usePathname();

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const menuItems = useMemo<MenuItemType[]>(
    () => [
      {
        key: `/organizations/${orgPath}/projects/${projectPath}/analytics`,
        label: (
          <Link
            href={`/organizations/${orgPath}/projects/${projectPath}/analytics`}
          >
            Analytics
          </Link>
        ),
        icon: <LineChartOutlined />,
      },
      {
        key: `/organizations/${orgPath}/projects/${projectPath}/documents`,
        label: (
          <Link
            href={`/organizations/${orgPath}/projects/${projectPath}/documents`}
          >
            Documents
          </Link>
        ),
        icon: <BookOutlined />,
      },
      {
        key: `/organizations/${orgPath}/projects/${projectPath}/requirements`,
        label: (
          <Link
            href={`/organizations/${orgPath}/projects/${projectPath}/requirements`}
          >
            Requirements
          </Link>
        ),
        icon: <BarsOutlined />,
      },
      {
        key: `/organizations/${orgPath}/projects/${projectPath}/inconsistencies`,
        label: (
          <Link
            href={`/organizations/${orgPath}/projects/${projectPath}/inconsistencies`}
          >
            Inconsistencies
          </Link>
        ),
        icon: <AimOutlined />,
      },
      {
        key: `/organizations/${orgPath}/projects/${projectPath}/ambiguities`,
        label: (
          <Link
            href={`/organizations/${orgPath}/projects/${projectPath}/ambiguities`}
          >
            Ambiguities
          </Link>
        ),
        icon: <DeleteRowOutlined />,
      },
      {
        key: `/organizations/${orgPath}/projects/${projectPath}/export`,
        label: (
          <Link
            href={`/organizations/${orgPath}/projects/${projectPath}/export`}
          >
            Export
          </Link>
        ),
        icon: <FileExcelOutlined />,
      },
    ],
    [orgPath, projectPath],
  );

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
        items={menuItems}
        inlineCollapsed={collapsed}
      />
    </div>
  );
};
