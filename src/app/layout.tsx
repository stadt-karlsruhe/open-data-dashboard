import './globals.css';
import './globals.scss';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}
