import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { Fragment, Suspense } from "react";

async function getData() {
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=603fc2b08dea422db8117a411f1807c8",
    { next: { revalidate: 3600 } } // cache the data for 3600 seconds and then recall api
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  //   const users = useSelector((state) => state);

  //   console.log("users", users);
  const data = await getData();

  return (
    <div className="w-[100%] h-screen grid place-items-center">
      <Suspense fallback={<p>Loading feed...</p>}>
        <NewsCard data={data} />
        <p>Loading feed...</p>
      </Suspense>
      {/* <p>Loading feed...</p> */}
    </div>
  );
}
