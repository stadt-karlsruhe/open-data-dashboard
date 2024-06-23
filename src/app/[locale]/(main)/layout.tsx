import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Navigation from '@/components/navigation/Navigation';
import NavigationProvider from '@/components/navigation/NavigationProvider';
import { colorLight } from '@/utils/colors';
import { getValidatedConfiguration } from '@/schemas/validate';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { success, configuration, error } = await getValidatedConfiguration();
  if (!success) {
    return <ErrorComponent type="configurationError" error={error} />;
  }
  return (
    <NavigationProvider>
      <div className="d-flex flex-column min-vh-100" style={{ background: colorLight }}>
        <Header configuration={configuration} />
        <div className="container-lg d-flex bg-white flex-fill p-0 position-relative">
          <Navigation configuration={configuration} />
          <div className="flex-fill overflow-hidden">{children}</div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </NavigationProvider>
  );
}
