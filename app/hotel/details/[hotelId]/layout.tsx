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
  return <main>{children}</main>;
};

export default layout;
