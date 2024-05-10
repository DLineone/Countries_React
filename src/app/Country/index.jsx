import { Link, useParams } from "react-router-dom";
import useSWR from "swr";

function Country() {
  let { countryId } = useParams();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: country,
    error,
    isLoading,
  } = useSWR(`https://restcountries.com/v3.1/alpha/${countryId}`, fetcher);

  if (country) console.log(country);

  if (error)
    return <main className="font-bold text-5xl">{"Maybe not today;("}</main>;
  if (isLoading) return <main> loading skeleton</main>;

  return (
    <main className="relative w-full h-full bg-slate-100 text-black">
      <Link to={"../"} className="w-full h-10 p-2 pl-10 flex items-center">
        <span className="inline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 18h-6a3 3 0 0 1 -3 -3v-10l-4 4m8 0l-4 -4" />
          </svg>
        </span>
        <span className="text-lg">Back</span>
      </Link>
      <div className="p-10 h-1/5 w-full flex items-center justify-evenly">
        <div className="flex items-center justify-center h-full w-1/5">
          <img
            className="object-contain max-h-full"
            src={country[0].flags.svg}
            alt={country[0].flags.alt}
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full w-3/5 p-10">
          <div className="font-bold text-xl">Welcome to</div>
          <div className="font-bold text-5xl text-center">
            {country[0].name.common}!
          </div>
        </div>
        <div className="flex items-center justify-center h-full w-1/5">
          {!!country[0].coatOfArms.svg ? (
            <img
              className="object-contain max-h-full"
              src={country[0].coatOfArms.svg}
              alt=""
            />
          ) : (
            <div className="font-bold text-xl"> No coat of arms? :/</div>
          )}
        </div>
      </div>
      <div className="w-full h-2/5 items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-co p-10">
        <div className="text-base justify-self-center text-slate-600">
          {"Capital: "}
          {country[0].capital.join("")}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Borders: "}
          {country[0].borders.join(", ")}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Area: "}
          {country[0].area}
          {" km"}
          <span className="align-top text-xs">2</span>
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Road car side: "}
          {country[0].car.side}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Continents: "}
          {country[0].continents.join(", ")}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Main currency: "}
          {Object.entries(country[0].currencies)[0]?.[1].name}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Phone code: "}
          {country[0].idd.root}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Main language: "}
          {Object.entries(country[0].languages)[0]?.[1]}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Population: "}
          {country[0].population}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Region: "}
          {country[0].region}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Sub-region: "}
          {country[0].subregion}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Top-level domain: "}
          {country[0].tld}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"United Nations member: "}
          {country[0].unMember ? "It is! :D" : "Nah..."}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Coordinates: "}
          {country[0].latlng[0]}
          {" lat, "}
          {country[0].latlng[1]}
          {" lng"}
        </div>
        <div className="text-base justify-self-center text-slate-600">
          {"Timezones: "}
          {country[0].timezones.map((zone) => `(${zone})`).join("")}
        </div>
      </div>
      <div className="w-full h-full border-transparent p-10  bg-slate-100">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://maps.google.com/maps?q=${country[0].name.common}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
}

export default Country;

{
  /* <iframe
        src={`https://maps.google.com/maps?q=${country[0].name.common}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe> */
}
