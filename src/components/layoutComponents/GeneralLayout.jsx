import { BottomNav } from "../BottomNav";
import { Navbar } from "./Navbar";

export const GeneralLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <BottomNav />
    </>
  );
};
