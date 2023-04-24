import { Link } from "react-router-dom";
import { navigationLinks } from "../../const";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          {navigationLinks.map((link, idx) => (
            <Link key={idx} to={link.slug} className="header__link">
              <li>{link.title}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
