'use client';

import { useShowNavigation } from '../navigation/NavigationProvider';

export default function Header() {
  const { show, setShow } = useShowNavigation();
  return (
    <>
      <button
        className="btn btn-secondary d-block d-md-none"
        onClick={(e) => {
          setShow(!show);
        }}
      >
        <i className="bi bi-list" />
      </button>
    </>
  );
}
