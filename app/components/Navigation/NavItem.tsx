// Typings
import { NavItemProps } from "../../../typings";

const NavItem = ({ label, path }: NavItemProps) => {
  return (
    <li className="mr-6">
      <a className="text-blue-500 hover:text-blue-800" href={path}>
        {label}
      </a>
    </li>
  );
};

export default NavItem;
