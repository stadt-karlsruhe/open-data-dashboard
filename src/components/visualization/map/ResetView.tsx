import L, { Map } from 'leaflet';
import React, { Component } from 'react';
import { ResetViewInput, ResetViewProps } from '@/types/visualization';
import { useMap } from 'react-leaflet';

class ResetView extends React.Component<{ resetViewInput: ResetViewInput; map: Map }> {
  createButtonControl() {
    const Button = L.Control.extend({
      onAdd: (map: Map) => {
        const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control');
        console.log(this.props);
        button.innerHTML = this.props.resetViewInput.title;

        button.addEventListener('click', () => {
          if (map instanceof Map) {
            map.setView(this.props.resetViewInput.pos.latLon, this.props.resetViewInput.pos.zoom);
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

function withMap(Component: typeof ResetView) {
  // eslint-disable-next-line func-names
  return function WrappedComponent(props: ResetViewProps) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(ResetView);
