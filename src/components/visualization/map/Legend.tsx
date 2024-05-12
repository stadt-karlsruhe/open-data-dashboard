import L, { Map } from 'leaflet';
import { LegendInput, LegendProps } from '@/types/visualization';
import React from 'react';
import styles from './mapstyles.module.css';
import { useMap } from 'react-leaflet';

class LegendWrapper extends React.Component<{ legendInput: LegendInput; map: Map }> {
  createLegend() {
    const Legend = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', `leaflet-bar ${styles.legend}`);
        div.innerHTML += `<h6>${this.props.legendInput.title}</h6>`;
        this.props.legendInput.labels.forEach((color, label) => {
          div.innerHTML += `<i style="background: ${color}"></i><span>${label}</span><br>`;
        });
        return div;
      },
    });
    return new Legend({ position: 'bottomleft' });
  }

  componentDidMount() {
    const { map } = this.props;
    const legend = this.createLegend();
    legend.addTo(map);
  }

  render() {
    return null;
  }
}

export default function LegendComponent(props: LegendProps) {
  const map = useMap();
  return <LegendWrapper {...props} map={map} />;
}
