import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import { CoreLayout } from "@/ui/layout/coreLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Speclarify",
  description: "Requirements Engineering Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CoreLayout>{children}</CoreLayout>
      </body>
    </html>
  );
}
