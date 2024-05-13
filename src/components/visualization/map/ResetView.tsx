import L, { Map } from 'leaflet';
import { ResetViewInput, ResetViewProps } from '@/types/visualization';
import React from 'react';
import styles from './mapstyles.module.css';
import { useMap } from 'react-leaflet';

class ResetView extends React.Component<{ resetViewInput: ResetViewInput; map: Map }> {
  createButtonControl() {
    const Button = L.Control.extend({
      onAdd: (map: Map) => {
        const button = L.DomUtil.create('button', `leaflet-bar ${styles.reset_view}`);
        button.innerHTML += `<div style='color:#000;' class='bi bi-crosshair'></div>`;

        button.addEventListener('click', () => {
          if (map instanceof Map) {
            map.setView(this.props.resetViewInput.pos.latLng, this.props.resetViewInput.pos.zoom);
          }
        });
        return button;
      },
    });
    return new Button({ position: 'topleft' });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  render() {
    return null;
  }
}

export default function ResetComponent(props: ResetViewProps) {
  const map = useMap();
  return <ResetView {...props} map={map} />;
}
