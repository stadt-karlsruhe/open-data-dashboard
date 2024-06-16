import { CopyBlock, dracula } from 'react-code-blocks';
import { Dashboard, Resource } from '@/schemas/configurationSchema';
import { useLocale, useTranslations } from 'next-intl';

import { Modal } from 'react-bootstrap';
import { useState } from 'react';

type EmbedModalProps =
  | {
      type: 'dashboard';
      element: Dashboard;
      show: boolean;
      setShow: (show: boolean) => void;
    }
  | { type: 'resource'; element: Resource; show: boolean; setShow: (show: boolean) => void };

// eslint-disable-next-line max-lines-per-function
export default function EmbedModal({ show, type, element, setShow }: EmbedModalProps) {
  const [iFrameWidth, setIFrameWidth] = useState('700');
  const [iFrameHeight, setIFrameHeight] = useState('400');
  const [keepParams, setKeepParams] = useState(true);
  const locale = useLocale();
  const t = useTranslations('EmbedModal');

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        setIFrameWidth('700');
        setIFrameHeight('400');
        setKeepParams(true);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t(`${type}Title`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t(`${type}Body`)}</p>
        <div className="row mb-1 mb-md-3">
          <div className="col-6">
            <label htmlFor="widthInput" className="form-label">
              <strong>{t('embedWidth')}:</strong>
            </label>
            <input
              type="number"
              value={iFrameWidth}
              onChange={(e) => {
                setIFrameWidth(e.target.value);
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
              value={iFrameHeight}
              onChange={(e) => {
                setIFrameHeight(e.target.value);
              }}
              className="form-control"
              id="heightInput"
              aria-describedby="heightInput"
            />
          </div>
        </div>
        {type === 'resource' && (element.type === 'JSON' || element.type === 'CSV') && (
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
        )}
        <div className="form-label">
          <strong>Code:</strong>
        </div>
        <CopyBlock
          text={`<iframe width="${iFrameWidth}" height="${iFrameHeight}" src="${window.location.origin}/${locale}/embed/${type}/${element.id}${keepParams ? getParamsFromWindow() : ''}" title="${element.name}" />`}
          language="html"
          theme={dracula}
          wrapLongLines={true}
        />
      </Modal.Body>
    </Modal>
  );

  function getParamsFromWindow() {
    if (type === 'resource' && (element.type === 'JSON' || element.type === 'CSV')) {
      const filteredParams = new URLSearchParams();
      const params = new URLSearchParams(window.location.search);
      params.forEach((value, key) => {
        if (key === 'filter' || key === 'visualization') {
          filteredParams.append(key, value);
        }
      });
      return filteredParams.size === 0 ? '' : `?${filteredParams.toString()}`;
    }
    return '';
  }
}
