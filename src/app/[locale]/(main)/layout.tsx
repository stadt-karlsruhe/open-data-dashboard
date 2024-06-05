import NavigationProvider from '@/components/navigation/NavigationProvider';
import { colorLight } from '@/colors';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ background: colorLight }}>
      <NavigationProvider>{children}</NavigationProvider>
    </div>
  );
}
