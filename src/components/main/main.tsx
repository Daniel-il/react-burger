import { ReactNode } from "react";
import mainStyle from "./main.module.css";
import { FC } from "../../services/types/utils";
type TMainProps = {
  children: ReactNode;
};

export const Main: FC<TMainProps> = ({ children }) => {
  return <main className={mainStyle.main}>{children}</main>;
};
