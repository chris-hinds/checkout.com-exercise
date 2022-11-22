// Styles
import "../styles/globals.css";
import Header from "./components/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
