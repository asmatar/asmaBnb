import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Hotel",
  description: "You can create your hotel and save it into the application ",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default layout;
