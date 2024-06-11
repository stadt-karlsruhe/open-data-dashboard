'use client';

import { CopyBlock, dracula } from 'react-code-blocks';
import { useLocale, useTranslations } from 'next-intl';

import Modal from 'react-bootstrap/Modal';
import { Resource } from '@/schemas/configuration-schema';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '@/locales';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const { Link } = createSharedPathnamesNavigation({
  locales: [...locales.values()],
});

// eslint-disable-next-line max-lines-per-function
export default function ResourceDetailsControls({ resource }: { resource: Resource }) {
  const [show, setShow] = useState(false);
  const [iframeWidth, setIframeWidth] = useState('700');
  const [iframeHeight, setIframeHeight] = useState('400');
  const [keepParams, setKeepParams] = useState(true);
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('ResourceDetailsControls');

  return (
    <div className="d-flex flex-row justify-content-center justify-content-md-between mb-3">
      <Link className="btn btn-primary" href={`/embed/resource/${resource.id}${getParams()}`} title={t('fullscreen')}>
        <i className="bi bi-arrows-fullscreen" /> <span className="d-none d-md-inline">{t('fullscreen')}</span>
      </Link>
      <div className="d-flex flex-row">
        <button
          className="btn btn-primary ms-1 ms-md-0"
          onClick={() => {
            setShow(true);
          }}
          title={t('embed')}
        >
          <i className="bi bi-code-slash" /> <span className="d-none d-md-inline">{t('embed')}</span>
        </button>
        <Link className="btn btn-primary ms-1 ms-md-3" href={resource.source} target="_blank" title={t('download')}>
          <i className="bi bi-download" /> <span className="d-none d-md-inline">{t('download')}</span>
        </Link>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setIframeWidth('700');
          setIframeHeight('400');
          setKeepParams(true);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('embedTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('embedBody')}</p>
          <div className="row mb-1 mb-md-3">
            <div className="col-6">
              <label htmlFor="widthInput" className="form-label">
                <strong>{t('embedWidth')}:</strong>
              </label>
              <input
                type="number"
                value={iframeWidth}
                onChange={(e) => {
                  setIframeWidth(e.target.value);
                }}
                className="form-control"
                id="widthInput"
                aria-describedby="widthInput"
              />
            </div>
            <div className="col-6">
              <label htmlFor="heightInput" className="form-label">
                <strong>{t('embedHeight')}:</strong>
              </label>
              <input
                type="number"
                value={iframeHeight}
                onChange={(e) => {
                  setIframeHeight(e.target.value);
                }}
                className="form-control"
                id="heightInput"
                aria-describedby="heightInput"
              />
            </div>
          </div>
          {resource.type === 'JSON' || resource.type === 'CSV' ? (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={keepParams}
                id="keepParams"
                onChange={(e) => {
                  setKeepParams(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="keepParams">
                {t('keepSearchParams')}
              </label>
            </div>
          ) : (
            <></>
          )}
          <div className="form-label">
            <strong>Code:</strong>
          </div>
          <CopyBlock
            text={`<iframe width="${iframeWidth}" height="${iframeHeight}" src="${window.location.origin}/${locale}/embed/resource/${resource.id}${keepParams ? getParamsFromWindow() : ''}" />`}
            language="html"
            theme={dracula}
            wrapLongLines={true}
          />
        </Modal.Body>
      </Modal>
    </div>
  );

  function getParams() {
    if (resource.type === 'JSON' || resource.type === 'CSV') {
      const params = Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => key === 'search' || key === 'visualization'),
      );
      return Object.keys(params).length === 0 ? '' : `?${new URLSearchParams(params).toString()}`;
    }
    return '';
  }

  function getParamsFromWindow() {
    if (resource.type === 'JSON' || resource.type === 'CSV') {
      const filteredParams = new URLSearchParams();
      const params = new URLSearchParams(window.location.search);
      params.forEach((value, key) => {
        if (key === 'search' || key === 'visualization') {
          filteredParams.append(key, value);
        }
      });
      return filteredParams.size === 0 ? '' : `?${filteredParams.toString()}`;
    }
    return '';
  }
}
