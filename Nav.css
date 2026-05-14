import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-logo">
        <span className="nav-logo-dot" />
        ECU//DIR
      </NavLink>

      <div className="nav-links">
        <NavLink to="/directory" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Directory
        </NavLink>
        <NavLink to="/ecus" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          ECUs
        </NavLink>
        <NavLink to="/builds" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Builds
        </NavLink>
      </div>

      <div className="nav-spacer" />

      <NavLink to="/submit" className="nav-cta">
        + List your shop
      </NavLink>
    </nav>
  );
}
