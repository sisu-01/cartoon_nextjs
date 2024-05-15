import Paging from "@/components/testPaging/paging";

const getCartoons = async (seriesId, page) => {
  const res = await fetch(`http:/localhost:4000/api/list?id=${seriesId}&page=${page}`);
  if (!res.ok) {
    throw new Error("getSeries error!");
  }
  return res.json();
}

const SeriesPage = async ({params, searchParams}) => {
  const {seriesId} = params;
  let {page=1} = searchParams;
  page = parseInt(page);

  const series = await getCartoons(seriesId, page);

  return (
    <div>
      {series.list.map((cartoon) => (
        <div key={cartoon.id}>
          <a href={`https://gall.dcinside.com/board/view/?id=cartoon&no=${cartoon.id}`} target="_blank">          
            {cartoon.title}
          </a>
        </div>
      ))}
      <Paging
        page={page}
        perPage={series.perPage}
        count={series.count}
        pageBtn={5}
        pathName={`/series/${seriesId}`}
      />
    </div>
  );
}

export default SeriesPage;