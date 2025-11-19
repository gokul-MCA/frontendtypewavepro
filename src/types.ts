export interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

export interface ResultType {
  accuracy: number;
  cpm: number;
  wpm: number;
  createdAt?: string;
}

export interface FormValues  {
  name: string;
  email: string;
  message: string;
};