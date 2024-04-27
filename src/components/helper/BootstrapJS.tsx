// Source: https://stackoverflow.com/questions/76089345/where-to-import-bootstrap-js-file-in-next-js-13-using-new-app-directory
'use client';

import { useEffect } from 'react';

export default function BootstrapJS() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return null;
}
