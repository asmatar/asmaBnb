import { getTranslations } from "next-intl/server";
export const generateMetadata = async () => {
  const t = await getTranslations("Metadata");
  return {
    title: t("HotelComparator.title"),
    description: t("HotelComparator.description"),
  };
};

const page = () => {
  return <div>page</div>;
};

export default page;
