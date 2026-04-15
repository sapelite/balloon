import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo exploration",
  description: "Internal logo concept board for the Skyrol brand.",
  robots: { index: false, follow: false },
};

export default function LogosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
