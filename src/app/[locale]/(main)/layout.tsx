import ErrorComponent from '@/components/error-handling/ErrorComponent';
import Footer from '@/components/Footer';
import Header from '@/components/header/Header';
import Navigation from '@/components/navigation/Navigation';
import NavigationProvider from '@/components/navigation/NavigationProvider';
import { colorLight } from '@/colors';
import { configurationSchema } from '@/schemas/configuration-schema';
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
  const parsedConfiguration = configurationSchema.safeParse(configuration.data);
  if (!parsedConfiguration.success) {
    return <ErrorComponent type="configurationInvalid" error={JSON.stringify(parsedConfiguration.error)} />;
  }
  return (
    <NavigationProvider>
      <div className="d-flex flex-column min-vh-100" style={{ background: colorLight }}>
        <Header configuration={parsedConfiguration.data} />
        <div className="container-lg d-flex bg-white flex-fill">
          <Navigation configuration={parsedConfiguration.data} />
          {children}
        </div>
      </div>
      <Footer className="mt-auto" />
    </NavigationProvider>
  );
}
