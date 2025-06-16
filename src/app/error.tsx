"use client";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Error - Arya",
  description: "An error has occurred. Please try again later.",
};

export default function Error() {
  return <div>Something went wrong!</div>;
}