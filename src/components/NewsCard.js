"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import NewsCardItem from "./NewsCardItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isAuthenticated } from "@/redux/users/userSlice";

const NewsCard = ({ data }) => {
  const [isGrid, setIsGrid] = useState(false);
  const users = useSelector((state) => state.userReducer.users);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("token news: " + !!token, users?.isAuthenticated);
    if (!users?.isAuthenticated && !token) {
      console.log("inside if: " + !token);
      router.push("/");
    }
  }, [dispatch]);

  //   console.log("users", isAuthenticated);

  //   console.log("data", data);

  return (
    <main className="w-full p-10 mt-10 h- flex row gap-4 gap-y-8 flex-wrap  justify-between items-center ">
      <h1 className="w-[100%] text-center font-bold text-4xl underline">
        {" "}
        Today's Latest News !!
      </h1>
      <div className="w-[100%] flex flex-row justify-between items-center">
        <label class="relative inline-flex items-center cursor-pointer">
          {/* <span class="ms-3 text-sm font-medium text-white-900 dark:text-gray-300">
            Grid View
          </span> */}
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            onChange={(e) => {
              console.log(e.target.checked);
              setIsGrid(e.target.checked);
            }}
          />
          <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ms-3 text-sm font-medium text-white-900 dark:text-gray-300">
            Grid View
          </span>
        </label>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(isAuthenticated());
            router.push("/");
          }}
          class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Log Out
        </button>
      </div>

      {data.articles.map((item) => {
        return isGrid ? (
          <NewsCardItem item={item} key={item?.publishedAt} />
        ) : (
          <div className="border">
            <dl className="w-full px-2 bg-slate text-gray-400 divide-y divide-gray-200 dark:text-white dark:divide-gray-700  ">
              <div className="flex flex-col pb-3  py-3 px-2">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  {" "}
                  News Title:
                </dt>
                <dd className="text-lg font-semibold">{item.title}</dd>
              </div>
              <div className="flex flex-col py-3 px-2">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  News description:
                </dt>
                <dd className="text-lg font-semibold">{item.description}</dd>
              </div>

              {/* <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                
              </dt> */}

              {/* <dd class="text-lg font-semibold">
                +00 123 456 789 / +12 345 678
              </dd> */}
            </dl>
            <div className="w-36 px-2  py-3 ">
              <Link
                href={`/News/${item?.author}`}
                className="   flex flex-wrap flex-row  file:inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
        //   <div className=" w-80 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        //     <Link href={`/News/${item?.author}`}>
        //       <img
        //         className="rounded-t-lg max-h-10"
        //         src={item?.urlToImage}
        //         alt=""
        //       />
        //     </Link>
        //     <div class="p-5">
        //       <Link href={`/News/${item?.author}`}>
        //         <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //           {item?.title.length > 20
        //             ? item?.title.slice(0, 20) + "..."
        //             : item?.title}
        //           {/* {item?.title} */}
        //         </h5>
        //       </Link>
        //       <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        //         {item?.description.length > 50
        //           ? item?.description.slice(0, 50) + "..."
        //           : item?.description}
        //       </p>
        //       <Link
        //         href={`/News/${item?.author}`}
        //         class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        //       >
        //         Read more
        //         <svg
        //           class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        //           aria-hidden="true"
        //           xmlns="http://www.w3.org/2000/svg"
        //           fill="none"
        //           viewBox="0 0 14 10"
        //         >
        //           <path
        //             stroke="currentColor"
        //             stroke-linecap="round"
        //             stroke-linejoin="round"
        //             stroke-width="2"
        //             d="M1 5h12m0 0L9 1m4 4L9 9"
        //           />
        //         </svg>
        //       </Link>
        //     </div>
        //   </div>
      })}
    </main>
  );
};

export default NewsCard;
