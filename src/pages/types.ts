export interface CommunicationPhoneNumber {
  id: number;
  value: string;
  communicationType: CommunicationType;
  location: Location;
  subscriber: Subscriber;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  country: string;
  region: string;
  district: string;
  city: string;
  street: string;
  building: string;
  section: string;
  floor: string;
  room: string;
  parentId: number | null;
}

export interface Human {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Subscriber {
  id: number;
  human: Human | null;
  position: string | null;
  description: string | null;
}

export interface CommunicationType {
  id: string;
  value: string;
}

export interface GetListI {
  data: Location[] | undefined;
  isLoading: boolean;
}

export type DisabledFields = {
  [key in keyof Location]?: boolean;
};

export interface ObjectI<T> {
  [key: string]: T;
}