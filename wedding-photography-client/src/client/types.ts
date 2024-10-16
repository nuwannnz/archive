export interface Domain {
  _id: string;
  name: string;
  contact_details: string;
  email: string;
  address: string;
  about_us: string;
  tag_line: string;
}

export interface Booking {
  date: string;
  event_date: string;
  session: string;
  capacity: number;
}
