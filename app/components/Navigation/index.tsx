// Typings
import { NavItemProps } from "../../../typings";

// Routes
import { PageLinks } from "./PageLinks";

// Components
import NavItem from "./NavItem";

const Navigation = () => {
  return (
    <ul className="flex">
      {PageLinks.map(({ label, path }: NavItemProps, PageLinksIndex) => (
        <NavItem
          key={`navigation-${PageLinksIndex}`}
          label={label}
          path={path}
        />
      ))}
    </ul>
  );
};

export default Navigation;
