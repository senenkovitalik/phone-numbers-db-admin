export interface CommunicationPhoneNumber {
  id: number;
  value: string;
  communicationType: {
    id: string;
    value: string;
  };
  location: {
    id: string;
    name: string;
  };
  subscriber: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
  };
}
