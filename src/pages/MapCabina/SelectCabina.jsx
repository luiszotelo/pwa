import { useDispatch } from "react-redux";
import { Select } from "antd";
import styles from "./MapCabina.module.css";
import { useSelector } from "react-redux";
import { filterByService } from "../../context/slices/cabinaThunks";
export const SelectCabina = ( { map }) => {
  const { serviceIdsArray } = useSelector(state => state.cabinaReducer)
  const dispatch = useDispatch()
  const handleChange = (value) => {
    if(!value.length) return 
    dispatch(filterByService(map.current,value[0]))
  };
  return (
    <>
      <div className={styles["select-types"]}>
        <Select
          mode="multiple"
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
