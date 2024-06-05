import { getSeriesDetail } from "@/lib/data";

export const generateMetadata = async ({params}) => {
  const { seriesId } = params;
  const seriess = await getSeriesDetail(seriesId);
  const series = seriess[0];
  return {
    title: series.title,
    description: "슉 슈슉 시",
  };
}

const SeriesLayout = async ({children, params}) => {

  const { seriesId } = params;
  const seriess = await getSeriesDetail(seriesId);
  const series = seriess[0];
  
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