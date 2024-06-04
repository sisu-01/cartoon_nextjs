import { dateFormat } from "@/lib/common";
import { getAnonWriterInfo } from "@/lib/data";

const Anon = async ({searchParams}) => {
  const { nickname } = searchParams;
  const writer = await getAnonWriterInfo(nickname);
  return (
    <div>
      {writer.nickname}
      {dateFormat(writer.first_date)}
      {dateFormat(writer.last_date)}
      {writer.count}
      {writer.recommend}
      {writer.average}
    </div>
  );
}

export default Anon;