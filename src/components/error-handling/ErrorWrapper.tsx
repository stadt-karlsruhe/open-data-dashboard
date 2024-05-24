import GenericError from '../GenericError';

export default function ErrorWrapper({
  message,
  code,
  detail,
  originalError,
}: {
  message?: string;
  code?: string;
  detail: string;
  originalError?: Error;
}) {
  console.error(originalError);
  return <GenericError message={message} code={code} detail={detail} />;
}
