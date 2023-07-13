import { SelectCabina } from "./SelectCabina";
import { AlertsCabina } from ".";

export const StuffCabina = ({ map }) => {
  return (
    <>
      <SelectCabina  map={map}/>
      <AlertsCabina />
    </>
  );
};
