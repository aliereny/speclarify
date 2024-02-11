"use client";
import { Avatar, Layout, Menu, Popconfirm, Space } from "antd";
import Link from "next/link";
import Image from "next/image";
import { StyledHomeNavLogo } from "@/ui/organisms/home-nav/homeNav.styled";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { signOutRequest } from "@/redux/slices/userSlice";

export const DashboardNav = () => {
  const pathname = usePathname();

  const { currentUser } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOutRequest());
  };

  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        justifyContent: "space-between",
      }}
    >
      <StyledHomeNavLogo>
        <Link href="/organizations">
          <Image src={"/logo-white.png"} alt="Logo" width={116} height={26} />
        </Link>
      </StyledHomeNavLogo>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: "/",
            label: <Link href={"/"}>Home</Link>,
          },
          {
            key: "/organizations",
            label: <Link href={"/organizations"}>Organizations</Link>,
          },
          {
            key: "/profile",
            label: (
              <Link href={"/profile"}>
                <Space>
                  <Avatar src={currentUser?.photo}>
                    {currentUser?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  {currentUser?.name}
                </Space>
              </Link>
            ),
          },
          {
            key: "signOut",
            label: (
              <Popconfirm
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleSignOut}
              >
                Sign out
              </Popconfirm>
            ),
          },
        ]}
        style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
      />
    </Layout.Header>
  );
};
