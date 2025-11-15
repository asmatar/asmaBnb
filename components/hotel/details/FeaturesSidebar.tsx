import { featuresConfigSidebar } from "@/helpers";
import { getTranslations } from "next-intl/server";
import Feature from "./Feature";
type FeaturesSidebarProps = {
  swimingPool: boolean;
  gym: boolean;
  spa: boolean;
  bar: boolean;
  restaurant: boolean;
  freeWifi: boolean;
  freeParking: boolean;
  shopping: boolean;
  bikeRental: boolean;
  laundry: boolean;
  movieNights: boolean;
  coffeeShop: boolean;
};

export const FeaturesSidebar = async ({
  ...features
}: FeaturesSidebarProps) => {
  const t = await getTranslations("HotelDetails");

  type FeaturesKeys = keyof typeof featuresConfigSidebar;
  console.log(features);
  return (
    <div className="lg:block lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        <div className="bg-card p-6 rounded-xl border border-primary/10">
          <h2 className="text-2xl font-semibold mb-6">
            <span className="text-accent-gradient">{t("amenities")}</span>
          </h2>
          <div className="grid  grid-cols-2  lg:grid-cols-1 gap-4">
            {(Object.keys(featuresConfigSidebar) as FeaturesKeys[]).map(
              (key) => {
                if (!features[key]) return null;
                const { icon: Icon, translationKey } =
                  featuresConfigSidebar[key];
                return (
                  <Feature
                    key={key}
                    Icon={<Icon className="w-5 h-5 text-primary" />}
                    translationKey={translationKey}
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSidebar;
