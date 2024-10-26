import { City, Country, State } from "country-state-city";

export const getAllCountries = async () => {
  return Country.getAllCountries();
};

export const getStatesByCountry = async (countryCode: string) => {
  return State.getStatesOfCountry(countryCode);
};

export const getCitiesByState = async (
  countryCode: string,
  stateCode: string,
) => {
  return City.getCitiesOfState(countryCode, stateCode);
};
