"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

async function getData() {
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=603fc2b08dea422db8117a411f1807c8"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  //   console.log("response", res.json());

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.userReducer.users
  );
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/");
  }

  console.log("users", isAuthenticated);
  const data = await getData();

  console.log("data", data);
  //   const users = useSelector((state) => state);

  //   console.log("users", users);

  return (
    <main className="w-full p-10 mt-20 h- flex row gap-4 gap-y-4 flex-wrap  justify-between items-center ">
      {data.articles.map((item) => {
        return (
          <div className=" w-80 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/News/${item?.author}`}>
              <img className="rounded-t-lg" src={item?.urlToImage} alt="" />
            </Link>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item?.title.length > 20
                    ? item?.title.slice(0, 20) + "..."
                    : item?.title}
                  {/* {item?.title} */}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item?.description.length > 50
                  ? item?.description.slice(0, 50) + "..."
                  : item?.description}
              </p>
              <Link
                href={`/News/${item?.author}`}
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>

          //   <div className="w-1/6 h-70 max-w-sm my-10 mx-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          //     <div className=" w-full flex flex-col items-center pb-10 px-4 pt-4">
          //       <img
          //         className="w-24 h-24 mb-3 rounded-full shadow-lg"
          //         src={item?.urlToImage}
          //         alt="Bonnie image"
          //       />
          //       {/* <Link to={"/add"} > */}
          //       <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          //         {item?.author}
          //       </h5>
          //       {/* </Link> */}
          //       {/* <span className="text-sm text-gray-500 dark:text-gray-400">
          //     {"weekly progress : " +
          //       (habitState.habits[index]?.week.filter(
          //         (item) => item.status == "done"
          //       ).length || 0) +
          //       "/" +
          //       (habits[index]?.week?.length || 0)}
          //   </span> */}
          //       <div className="flex mt-4 space-x-3 md:mt-6">
          //         <button
          //           type="button"
          //           class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          //         >
          //           details
          //         </button>
          //         {/* <Button type={"submit"} label={"Delete"} /> */}
          //       </div>
          //     </div>
          //   </div>
        );
      })}
      {/* <h1>hiiii</h1> */}
    </main>
  );
}
