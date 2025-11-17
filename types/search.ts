export type searchParamsType = {
  searchParams: Promise<{
    title: string;
    country: string;
    state: string;
    city: string;
    spa: string;
    gym: string;
    bar: string;
    restaurant: string;
    freeWifi: string;
    shopping: string;
    freeParking: string;
    swimingPool: string;
    from: number;
    to: number;
  }>;
};
