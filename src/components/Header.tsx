import LocaleSwitcher from './LocaleSwitcher';
import LogoKarlsruhe from '../public/Logo_Digital_Karlsruhe-rechts_rgb.svg';
import LogoKarlsruheSmall from '../public/Logo_Digital_Karlsruhe-rechts_rgb_small.svg';

export default function Header() {
  return (
    <div className="d-flex flex-row fs-2">
      <div className="d-flex flex-fill p-2 ps-4">Open Data Dashboard</div>
      <div className="d-flex flex-fill p-2 d-none d-md-block fs-5">Hier könnte ihre Suchleiste stehen</div>
      <div className="d-flex flex-fill p-2 d-none d-md-block">
        <LocaleSwitcher />
      </div>
      <div className="d-flex d-none d-md-block justify-content-end" style={{ height: '2em' }}>
        <LogoKarlsruhe />
      </div>
      <div className="d-flex d-md-none justify-content-end" style={{ height: '2.5em' }}>
        <LogoKarlsruheSmall />
      </div>
    </div>
  );
}
