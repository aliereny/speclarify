"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  StyledHomeNav,
  StyledHomeNavLogo,
  StyledNavItem,
  StyledNavList,
} from "@/ui/organisms/home-nav/homeNav.styled";

export const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledHomeNav $scrolled={scrolled}>
      <StyledHomeNavLogo>
        <Link href="/">
          <Image
            src={scrolled ? "/logo-colored.png" : "/logo-white.png"}
            alt="Logo"
            width={116}
            height={26}
          />
        </Link>
      </StyledHomeNavLogo>
      <StyledNavList>
        <Link href="/signin">
          <StyledNavItem>Sign in</StyledNavItem>
        </Link>
      </StyledNavList>
    </StyledHomeNav>
  );
};
