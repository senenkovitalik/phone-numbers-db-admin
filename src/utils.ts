import { Location, ObjectI } from "./pages/types";

export const isObject = (val: unknown): boolean => {
  if (val === null) {
    return false;
  }

  if (typeof val === "function") return false;

  return typeof val === "object";
};

export const transformFilter = (obj: ObjectI<any>): ObjectI<any> => {
  let result: ObjectI<any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      result[key] = { _in: value };
    } else if (isObject(value)) {
      result[key] = transformFilter(value);
    } else {
      result[key] = { _eq: value };
    }
  }

  return result;
};

export const getMapOfDisabledFields = (location: Location) => {
  const addressOrder = [
    "country",
    "region",
    "district",
    "city",
    "street",
    "building",
    "section",
    "floor",
    "room",
  ];

  let isEnd = false;

  return addressOrder.reverse().reduce((accumulator, currentValue) => {
    if (isEnd) {
      return {
        ...accumulator,
        [currentValue]: true,
      };
    }

    // @ts-ignore
    if (location[currentValue] !== null) {
      isEnd = true;

      return {
        ...accumulator,
        [currentValue]: true,
      };
    }

    return {
      ...accumulator,
      [currentValue]: false,
    };
  }, {});
};
