import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h1>
          <span>Sport</span>UP
        </h1>
      </div>
      <Link to={"/about"}>
        <span>About us</span>
      </Link>
    </footer>
  );
}
