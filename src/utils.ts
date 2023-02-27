import { Location } from "./pages/types";

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
