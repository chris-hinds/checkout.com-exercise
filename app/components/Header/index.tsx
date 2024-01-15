// Components
import HeaderLogo from "./headerLogo";
import Navigation from "../Navigation";

const Header = () => {
  return (
    <div className="p-4 flex flex-col sm:flex-row sm:justify-between justify-center gap-y-4 bg-brand">
      <div>
        <HeaderLogo />
      </div>
      <nav>
        <Navigation />
      </nav>
    </div>
  );
};

export default Header;
