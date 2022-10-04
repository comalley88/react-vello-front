export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    created_at: string;
    updated_at: string;
  }

export interface IListing {
  brand: string,
  model: string,
  yearPurchased: number,
  description: description,
  options: string,
}

export interface IAddress {
  addressLine1: string,
  addressLine2: string,
  postcode: string,
  city: string,
  country: string
}

export interface ITelephone {
  prefix: string,
  number: string
}
