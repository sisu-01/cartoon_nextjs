import Link from "next/link";

export const metadata = {
  title: "Series",
  description: "시리즈지롱",
}

const getSeries = async () => {
  const res = await fetch("http://localhost:4000/api/series");
  if (!res.ok) {
      throw new Error("getSeries error!");
  }
  return res.json();
}

  // {
  //   "id":684074,
  //   "title":"거북이 수인 만화1",
  //   "writer_id":"shk3012",
  //   "writer_nickname":"팬텀",
  //   "count":2,
  //   "last_update":"2024-02-27T10:55:57.000Z",
  //   "average":149
  // }

const Series = async () => {
  const seriesJson = await getSeries();
  return (
    <div>
      {seriesJson.list.map((series) => (
          <div key={series.id}>
            <Link href={`/series/${series.id}`}>
              {series.title}
            </Link>
          </div>
      ))}
    </div>
  );
}

export default Series;