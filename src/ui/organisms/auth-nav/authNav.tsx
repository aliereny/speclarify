"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { StyledHomeNavLogo } from "@/ui/organisms/home-nav/homeNav.styled";
import { usePathname } from "next/navigation";

export const AuthNav = () => {
  const pathname = usePathname();

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
        <Link href="/">
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
            key: "/signin",
            label: <Link href={"/signin"}>Sign in</Link>,
          },
          {
            key: "/signup",
            label: <Link href={"/signup"}>Sign up</Link>,
          },
        ]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Layout.Header>
  );
};
