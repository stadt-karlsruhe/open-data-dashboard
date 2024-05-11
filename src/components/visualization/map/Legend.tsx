import L, { Map } from 'leaflet';
import { LegendInput, LegendProps } from '@/types/visualization';
import React, { Component } from 'react';
import { useMap } from 'react-leaflet';

class Legend extends React.Component<{ legendInput: LegendInput; map: Map }> {
  createButtonControl() {
    const Button = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-container');
        div.innerHTML += `<h6>${this.props.legendInput.title}</h6>`;
        this.props.legendInput.labels.forEach((label) => {
          div.innerHTML += `<span>${label}</span><br>`;
        });
        return div;
      },
    });
    return new Button({ position: 'bottomleft' });
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

function withMap(Component: typeof Legend) {
  // eslint-disable-next-line func-names
  return function WrappedComponent(props: LegendProps) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(Legend);
