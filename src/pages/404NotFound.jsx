import { NoDataSvg } from "../assets/images/ErrorPage/no-data-svg.tsx";
import { Link } from "react-router-dom";

const NotFoundError = ({title="Sorry, we didn't find any match!"}) => (
  <div className="flex min-h-screen items-center justify-center bg-white px-4">
    <div className="max-w-md text-center">
      <div className="w-full">
        <NoDataSvg />
      </div>
      <h4 className="mt-9 mb-9 text-2xl leading-snug font-medium text-gray-900">
        {title}
      </h4>
      <Link
        to="/"
        className="rounded-md bg-[#9427A9] px-6 py-2 text-white transition hover:bg-[#9427A9]"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFoundError;