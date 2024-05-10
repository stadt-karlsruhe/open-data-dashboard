import React, { Component } from 'react';
import { useMap } from 'react-leaflet';
import L, { Map } from 'leaflet';
import { ViewButtonProps } from '@/types/visualization';

class ResetView extends React.Component<{ props: ViewButtonProps }> {
  createButtonControl() {
    const Button = L.Control.extend({
      onAdd: (map: Map) => {
        const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control');
        console.log(this.props);
        button.innerHTML = this.props.props.title;

        button.addEventListener('click', () => {
          if (map instanceof Map) {
            map.setView(this.props.props.pos.latLon, this.props.props.pos.zoom);
          }
        });
        return button;
      },
    });
    return new Button({ position: 'topleft' });
  }

  componentDidMount() {
    const { map } = this.props as map;
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

export default withMap(ResetView);
