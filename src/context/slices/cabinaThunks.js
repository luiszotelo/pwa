import { Marker, Popup } from "mapbox-gl";
import { setMarkers, setMarkersInMap, setServicesIdsArray } from "./cabinaSlice";
import { fbm } from "../../services/firabase/firabase";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate()
export const fillMarker = (data) => {
  return (dispatch) => {
    const markers = data.map((d) => d.trajectory[d.trajectory.length - 1]);
    dispatch(setMarkers(markers));
  };
};

export const showMarkers = (map) => {
  return (dispatch, getState) => {
    const { markers, markersInMap } = getState().cabinaReducer;

    if (markers !== null) {
      for (let i = 0; i < markers.length - 1; i++) {
        markersInMap[i]?.remove();
      }
    }

    for (let i = 0; i < markers.length; i++) {
      console.log(markers[i]);
      const marker = new Marker();

      marker.setLngLat([markers[i].longitude, markers[i].latitude]);
      dispatch(setMarkersInMap(marker));
      marker.addTo(map);
    }
  };
};

const markers = [];
let subscribe = null;

let subscribe2 = null;
export const createMarkers = (map) => {
  // eslint-disable-next-line no-unused-vars
  if(subscribe2) subscribe2()
  return (dispatch) => {
    fbm.observarServices((service) => {
      if (markers.length > 0) markers.forEach((marker) => marker.remove());
      service.forEach((serv) => {
        const marker = new Marker();
        const popup = new Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
        }).setHTML(
          ` <a  class='maker-link' id='a'  target="_blank" href='/travel/cliente/${serv.id}'>Observar Servicio</a>
                      <br>
                            Asistencia id: ${serv.idServicio} <br>
                     `
        );
        marker.setLngLat([
          serv.trajectory[serv.trajectory.length - 1].longitude,
          serv.trajectory[serv.trajectory.length - 1].latitude,
        ]);
        marker.addTo(map);
        marker.setPopup(popup);
        markers.push(marker);
        const  ids = service.map(s => ({label: s.idServicio, value: s.idServicio}))
        dispatch(setServicesIdsArray(ids))
      });
    })

  };
};

export const filterByService = (map, id) => {
  return (dispatch) => {
    // if(subscribe) subscribe();
    console.log("filterByService", id);
   subscribe2 = fbm.obtenerDocumentoPorID(id,(service) => {
      if (markers.length > 0) markers.forEach((marker) => marker.remove());
      const marker = new Marker();
      const popup = new Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }).setHTML( ` <a  class='maker-link' id='a'  target="_blank" href='/travel/cliente/${service.id}'>Observar Servicio</a>
                      <br>
                            Asistencia id: ${service.idServicio} <br>
                      `);
      marker.setLngLat([
        service.trajectory[service.trajectory.length - 1].longitude,
        service.trajectory[service.trajectory.length - 1].latitude,
      ]);
      marker.addTo(map);
      marker.setPopup(popup);
      markers.push(marker);
    }, id);
  };
};
