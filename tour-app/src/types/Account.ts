export interface newAccount {
  _id: string;
  username: string;
  email: string;
  password: string;
  address: string;
}

export interface AccountDetail {
  _id: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  role: number;
  historySeen: { _id: string; name: string; url: string }[];
}

export interface AccountUser {
  _id: string;
  username: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  role: number;
}
