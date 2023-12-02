// export async function generateStaticParams() {
//   const posts = await fetch(
//     "https://newsapi.org/v2/everything?q=bitcoin&apiKey=603fc2b08dea422db8117a411f1807c8"
//   ).then((res) => res.json());
//   console.log(posts.articles[0]);
//   return posts.articles.map((post) => ({
//     author: post.author,
//   }));
// }

import Link from "next/link";

async function getData(name) {
  console.log("name: " + name);
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=603fc2b08dea422db8117a411f1807c8"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  //   console.log("response", res.json());
  const data = await res.json();

  console.log("data", data.articles[0]);

  const filteredData = data.articles.filter(
    (article) => article.author === name
  );
  console.log("filteredData", filteredData);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return filteredData[0];
}

export default async function Page({ params }) {
  console.log("params", params);
  const data = await getData(params?.slug.replace(/%20/g, " "));

  return (
    <div className="w-full h-[90vh]  grid place-items-center">
      <div className="w-full h-[30rem]  max-w-2xl my-10 mx-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className=" w-full flex flex-col  items-center pb-10 px-4 pt-4">
          <div className="w-full flex row flex-nowrap justify-around items-center ">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg mx-3"
              src={data?.urlToImage}
              alt="Bonnie image"
            />
            <div>
              <span class="inline-flex items-center m-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <strong className="font-bold text-slate-800">author</strong>
                <span class="inline-flex items-center m-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"></span>
                {data?.author}
              </span>

              <span class="inline-flex items-center m-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <strong className="font-bold text-slate-800">
                  Article Id:
                </strong>
                <span class="inline-flex items-center m-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"></span>
                {data?.source.id}
              </span>

              <span class="inline-flex items-center m-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <strong className="font-bold text-slate-800">
                  Published at
                </strong>
                <span class="inline-flex items-center m-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"></span>
                {data?.publishedAt.slice(0, 10)}
              </span>
            </div>
          </div>
          <div className="w-full h-80 flex flex-col flex-nowrap justify-around ">
            <h5 className=" w-full mb-1 text-xl font-bold text-gray-900 dark:text-white">
              News name : {data?.source.name}
            </h5>
            {/* <span className="text-sm text-gray-500 dark:text-gray-400">
  {state.type}
</span> */}

            <span class=" w-full flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <span class="flex w-2.5 h-2.5 ml-2 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
              <strong className="font-bold text-slate-800 pr-2">Title:</strong>

              {data?.title}
            </span>
            <span class=" w-full flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <span class="flex w-2.5 h-2.5 ml-2 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
              <strong className="font-bold text-slate-800 pr-2">
                Description:
              </strong>

              {data?.description}
            </span>

            <span class=" w-full flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <span class="flex w-2.5 h-2.5 ml-2 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
              <strong className="font-bold text-slate-800 pr-2">
                Content:
              </strong>

              {data?.content}
            </span>

            <span class=" w-full flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <span class="flex w-2.5 h-2.5 ml-2 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
              <strong className="font-bold text-slate-800 pr-2">URL:</strong>
              <Link
                href={data.url}
                className="underline text-blue-800 font-bold"
              >
                {data.url}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  {
    /* <div>My Post: {data.title}</div>; */
  }
}
