import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/LogIn'>Log In</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;