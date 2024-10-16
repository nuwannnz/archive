import { Domain } from "./domain";

export interface Booking {
  _id: string;
  booked_date: Date;
  event_date: Date;
  session: string;
  capacity: number;
  client_name: string;
  client_contact: string;
  payment_status: string;
  paidAmount: number;
  totalAmount: number;
  notes: string;
  domain: Domain;
  isActive: boolean;
}
