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