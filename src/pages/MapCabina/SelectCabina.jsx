import { useDispatch } from "react-redux";
import { Select } from "antd";
import styles from "./MapCabina.module.css";
import { useSelector } from "react-redux";
import { filterByService, showMarker } from "../../context/slices/cabinaThunks";
export const SelectCabina = ( { map }) => {
  const { serviceIdsArray } = useSelector(state => state.cabinaReducer)
  const dispatch = useDispatch()
  const handleChange = (value) => {
    if(!value)  {
      showMarker(map.current)
    }
    dispatch(filterByService(map.current,value))
  };
  return (
    <>
      <div className={styles["select-types"]}>
        <Select
          // mode=""
          showSearch
          allowClear
          style={{
            width:  200 
          }}
          placeholder="Please select"
          onChange={handleChange}
          options={serviceIdsArray}
        />
      </div>
    </>
  );
};
