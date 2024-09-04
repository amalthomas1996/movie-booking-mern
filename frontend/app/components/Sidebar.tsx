import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="w-60 bg-gray-800 text-white flex flex-col ">
      <ul className="mt-10">
        <li>
          <Link href="/admin/dashboard" className="block p-4 hover:bg-gray-700">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/theaters" className="block p-4 hover:bg-gray-700">
            Theaters
          </Link>
        </li>
        <li>
          <Link href="/admin/movies" className="block p-4 hover:bg-gray-700">
            Movies
          </Link>
        </li>
        <li>
          <Link href="/admin/showtimes" className="block p-4 hover:bg-gray-700">
            Showtimes
          </Link>
        </li>
        <li>
          <Link href="/admin/bookings" className="block p-4 hover:bg-gray-700">
            Bookings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
