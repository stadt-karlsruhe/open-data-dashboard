import L, { Map as LeafletMap } from 'leaflet';
import React from 'react';
import styles from './mapstyles.module.css';
import { useMap } from 'react-leaflet';

class LegendWrapper extends React.Component<{
  legendInput: { title: string; labels: Map<string, string> };
  map: LeafletMap;
}> {
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

export default function LegendComponent(legendInput: { title: string; labels: Map<string, string> }) {
  const map = useMap();
  return <LegendWrapper legendInput={legendInput} map={map} />;
}
