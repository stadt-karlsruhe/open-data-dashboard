import Header from '@/components/header/Header';
import Navigation from '@/components/navigation/Navigation';
import NavigationProvider from '@/components/navigation/NavigationProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavigationProvider>
      <Header />
      <div className="container-md">
        <Navigation />
        {children}
      </div>
    </NavigationProvider>
  );
}
