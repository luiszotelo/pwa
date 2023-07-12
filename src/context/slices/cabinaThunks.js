import { Marker, Popup } from "mapbox-gl";
import { setMarkers, setMarkersInMap } from "./cabinaSlice";
import { fbm } from "../../services/firabase/firabase";

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
      for (let i = 0; i < markers.length -1; i++) {
        markersInMap[i]?.remove();
      }
    }

    for (let i = 0; i < markers.length; i++) {
      console.log(markers[i]);
      const marker = new Marker();

      marker.setLngLat([markers[i].longitude, markers[i].latitude]);
      dispatch(setMarkersInMap(marker))
      marker.addTo(map);
    }
  };
};

const markers = []
export const createMarkers  = (map) => {
    // eslint-disable-next-line no-unused-vars
    return (dispatch) => {
        fbm.observarServices( service => {
            if(markers.length > 0) markers.forEach(marker => marker.remove())
            service.forEach(serv => {
                const marker = new Marker();
                const popup = new Popup({ offset: 25, closeButton: false, closeOnClick: false  }).setHTML(
                    `<h3>holis</p>`
                );
                marker.setLngLat([serv.trajectory[serv.trajectory.length - 1].longitude, serv.trajectory[serv.trajectory.length - 1].latitude]);
                marker.addTo(map);
                marker.setPopup(popup);
                marker.getElement().addEventListener('click', () => {
                    console.log('dando click en el marker')
                })
                markers.push(marker)
            });
        })
    }

}