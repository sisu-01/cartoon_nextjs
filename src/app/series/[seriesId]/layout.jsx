export const generateMetadata = async ({params}) => {
  const {seriesId} = params;
  const series = await fetch(`http:/localhost:4000/api/listInfo?id=${seriesId}`).then((res) => res.json());
  return {
    title: series.title,
    description: "슉 슈슉 시",
  };
}

const getSeries = async (seriesId) => {
  const res = await fetch(`http:/localhost:4000/api/listInfo?id=${seriesId}`);
  if (!res.ok) {
    throw new Error("getSeries error!");
  }
  return res.json();
}

const SeriesLayout = async ({children, params}) => {

  const {seriesId} = params;
  const series = await getSeries(seriesId);
  
  return (
    <div>
      <h1>{series.title}</h1>
      <h2>
        <div>{series.writer_id}</div>
        <div>{series.writer_nickname}</div>
      </h2>
      {children}
    </div>
  );
}

export default SeriesLayout;