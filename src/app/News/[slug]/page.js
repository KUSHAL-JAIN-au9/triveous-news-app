// export async function generateStaticParams() {
//   const posts = await fetch(
//     "https://newsapi.org/v2/everything?q=bitcoin&apiKey=603fc2b08dea422db8117a411f1807c8"
//   ).then((res) => res.json());
//   console.log(posts.articles[0]);
//   return posts.articles.map((post) => ({
//     author: post.author,
//   }));
// }

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
  return <div>My Post: {data.title}</div>;
}
