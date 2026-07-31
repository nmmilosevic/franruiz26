import type { Metadata } from "next";
import HomeExperience from "../components/HomeExperience";

export const metadata: Metadata = {
  title: "Fran Ruiz Architects | Architecture with identity",
  description:
    "Contemporary architecture studio in Málaga and Marbella. Homes, hospitality, and end-to-end project delivery across the Costa del Sol.",
  alternates: { canonical: "/en" },
};

export default function EnglishHomePage() {
  return <HomeExperience language="en" />;
}
