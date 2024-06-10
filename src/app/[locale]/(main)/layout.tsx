import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Footer from '@/components/Footer';
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
  const { success, configuration, error } = await getConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  return (
    <NavigationProvider>
      <div className="d-flex flex-column min-vh-100" style={{ background: colorLight }}>
        <Header configuration={configuration} />
        <div className="container-lg d-flex bg-white flex-fill p-0">
          <Navigation configuration={configuration} />
          {children}
        </div>
      </div>
      <Footer className="mt-auto" />
    </NavigationProvider>
  );
}
