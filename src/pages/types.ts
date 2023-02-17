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
  description: string | null;
  country: string | null;
  region: string | null;
  district: string | null;
  city: string | null;
  street: string | null;
  building: string | null;
  section: string | null;
  floor: string | null;
  room: string | null;
}

export interface Subscriber {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface CommunicationType {
  id: string;
  value: string;
}
