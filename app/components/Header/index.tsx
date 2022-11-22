// Components
import Navigation from "../Navigation";

const Header = () => {
  return (
    <div className="p-4 flex flex-row justify-between">
      <div>Checkout.com</div>
      <nav>
        <Navigation />
      </nav>
    </div>
  );
};

export default Header;
