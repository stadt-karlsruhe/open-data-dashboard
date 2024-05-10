import React, { Component } from 'react';
import { useMap } from 'react-leaflet';
import L, { Map } from 'leaflet';
import { LegendProps } from '@/types/visualization';

class Legend extends React.Component<{ props: LegendProps }> {
  createButtonControl() {
    const Button = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-container');
        div.innerHTML += `<h6>${this.props.props.title}</h6>`;
        this.props.props.labels.forEach((label) => {
          div.innerHTML += `<span>${label}</span><br>`;
        });
        return div;
      },
    });
    return new Button({ position: 'bottomleft' });
  }

  componentDidMount() {
    const { map } = this.props as any;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  render() {
    return null;
  }
}

function withMap(Component: any) {
  return function WrappedComponent(props: any) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(Legend);
