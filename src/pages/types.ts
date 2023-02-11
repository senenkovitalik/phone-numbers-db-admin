export interface CommunicationPhoneNumber {
  id: number;
  value: string;
  communicationType: CommunicationType;
  location: Location;
  subscriber: Subscriber;
}

export interface Location {
  id: string;
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
