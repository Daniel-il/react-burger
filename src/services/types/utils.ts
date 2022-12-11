import { FunctionComponent } from "react";

export type TIngredientItem = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  nanoId?: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};
export type TOrderItem = {
  _id: string;
  ingredients: ReadonlyArray<string>;
  createdAt: string;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
};
export type FC<P = {}> = FunctionComponent<P>;
export type TUserData = {
  email: string;
  name: string;
};
export type TWsActionMessage = {
  orders: ReadonlyArray<TOrderItem>;
  total: number;
  totalToday: number;
};
export type TLoginRes = {
  success: boolean;
  user: TUserData;
  accessToken: string;
  refreshToken: string;
};
