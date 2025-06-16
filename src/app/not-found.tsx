import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Arya",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return <div>Not found</div>;
}