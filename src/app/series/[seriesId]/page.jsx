import Paging from "@/components/testPaging/paging";

export const generateMetadata = async ({params}) => {
  const {seriesId} = params;
  const series = await fetch(`http:/localhost:4000/api/list?id=${seriesId}`).then((res) => res.json());
  return {
    title: series.list[0].title,
    description: "슉 슈슉 시",
  };
}

const getSeries = async (seriesId) => {
  const res = await fetch(`http:/localhost:4000/api/list?id=${seriesId}`);
  if (!res.ok) {
    throw new Error("getSeries error!");
  }
  return res.json();
}

const SeriesInfo = async ({params}) => {
  const {seriesId} = params;
  const series = await getSeries(seriesId);
  return (
    <div>
      {series.list.map((cartoon) => (
        <div key={cartoon.id}>
          <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`}>          
            {cartoon.title}
          </a>
        </div>
      ))}
      <Paging perPage={series.perPage} count={series.count} pageBtn={5} />
    </div>
  );
}

export default SeriesInfo;