import { Configuration } from '@/schemas/configuration-schema';
import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Header from '@/components/header/Header';
import Navigation from '@/components/navigation/Navigation';
import NavigationProvider from '@/components/navigation/NavigationProvider';
import { colorLight } from '@/colors';
import { getConfiguration } from '@/configuration';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configuration = await getConfiguration();
  if (!configuration.success) {
    return <ErrorComponent type="configurationNotLoaded" error={String(configuration.error)} />;
  }

  return (
    <div style={{ background: colorLight }}>
      <NavigationProvider>
        <Header />
        <div className="container-md d-flex bg-white">
          {/* eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style */}
          <Navigation configuration={configuration.data as Configuration} />
          {children}
        </div>
      </NavigationProvider>
    </div>
  );
}
