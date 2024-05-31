'use client';

import { CopyBlock, dracula } from 'react-code-blocks';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { Resource } from '@/schemas/configuration-schema';
import { useSearchParams } from 'next/navigation';

// eslint-disable-next-line max-lines-per-function
export default function ResourceDetailsControls({ resource }: { resource: Resource }) {
  const [show, setShow] = useState(false);
  const [origin, setOrigin] = useState('');
  const [iframeWidth, setIframeWidth] = useState('700');
  const [iframeHeight, setIframeHeight] = useState('400');
  const [keepParams, setKeepParams] = useState(true);
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('ResourceDetailsControls');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div className="d-flex flex-row justify-content-between flex-wrap">
      <Link className="btn btn-primary mb-3" href={`/${locale}/resource/${resource.id}${getParams()}`}>
        <i className="bi bi-arrows-fullscreen" /> {t('fullscreen')}
      </Link>
      <div className="d-flex flex-row">
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            setShow(true);
          }}
        >
          <i className="bi bi-code-slash" /> {t('embed')}
        </button>
        <Link className="btn btn-primary ms-1 ms-md-3 mb-3" href={resource.source} target="_blank">
          <i className="bi bi-download" /> {t('download')}
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
            text={`<iframe width="${iframeWidth}" height="${iframeHeight}" src="${origin}/${locale}/resource/${resource.id}${keepParams ? getParamsFromWindow() : ''}" frameBorder="0" />`}
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
