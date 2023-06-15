import { Link } from "react-router-dom";
import notfound from "/pagenotfound.png";

const ErrorPage = () => {
  return (
    <div className="errorpage text-center mt-5">
      <div>
        <img className="w-3/4 h-3/4" src={notfound} alt="Page Not Found" />
      </div>

      <Link className="btn btn-info" to="/">
        Back to home button
      </Link>
    </div>
  );
};

export default ErrorPage;
