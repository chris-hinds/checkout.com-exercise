// Typings
import { NavItemProps } from "../../../typings";

const NavItem = ({ label, path }: NavItemProps) => {
  return (
    <li className="mr-6">
      <a className="text-white hover:text-slate-300" href={path}>
        {label}
      </a>
    </li>
  );
};

export default NavItem;
