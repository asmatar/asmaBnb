import Container from "@/components/ui/Container";
import React from "react";
// dynamic metadata
type Props = {
  params: {
    hotelId: string;
  };
};
export const generateMetadata = ({ params }: Props) => {
  return {
    title: `Hotel Details - ${params.hotelId}`,
    description: `Details about the hotel: ${params.hotelId}`,
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  );
};

export default layout;
