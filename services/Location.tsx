"use server";
import { City, Country, State } from "country-state-city";

export const getAllCountries = () => {
  return Country.getAllCountries();
};

export const getStatesByCountry = (countryCode: string) => {
  return State.getStatesOfCountry(countryCode);
};

export const getCitiesByState = (countryCode: string, stateCode: string) => {
  return City.getCitiesOfState(countryCode, stateCode);
};
