import { Link } from "react-router-dom";
import useSWR from "swr";

function Main() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: countries,
    error,
    isLoading,
  } = useSWR(
    "https://restcountries.com/v3.1/all?fields=name,capital,currencies,ccn3,flags",
    fetcher
  );

  if (error)
    return <main className="font-bold text-5xl">{"Maybe not today;("}</main>;
  if (isLoading) return <main> loading skeleton</main>;

  return (
    <main className="relative w-full h-full bg-slate-100 text-black">
      <div className="bg-opacity-30 backdrop-blur-sm z-10 fixed font-bold text-5xl top-0 left-0 pl-9 pb-2 pt-4 right-0 bg-slate-100 border-none mr-4">
        {"Let's see the "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Countries
        </span>
        {"!"}
      </div>
      <ul className="w-full h-screen overflow-y-scroll p-6 pt-16 divide-y ">
        {countries.map((country) => (
          <li className="cursor-pointer" key={country.ccn3}>
            <Link to={`country/${country.ccn3}`}>
              <div
                className="p-2 rounded-md bg-slate-100 hover:translate-x-2 transition-all 
                hover:shadow-lg shadow-sm divide-x divide-slate-400"
              >
                <div className="inline-flex items-center justify-center h-full">
                  <img
                    className="px-2 inline w-10 aspect-auto object-contain align-middle border-0"
                    src={country.flags.svg}
                    alt={country.flags.alt}
                  />
                </div>
                <span className="px-2 text-xl font-bold border-none">
                  {country.name.common}
                </span>
                <span className="px-2 text-base text-slate-400">
                  {"Capital: "}
                  {country.capital.join("")}
                </span>
                <span className="px-2 text-base text-slate-400">
                  {"Main currency: "}
                  {Object.entries(country.currencies)[0]?.[1].name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
