import Container from "@/components/ui/Container";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Create Hotel",
  description: "You can create your hotel and save it into the application ",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};

export default layout;
