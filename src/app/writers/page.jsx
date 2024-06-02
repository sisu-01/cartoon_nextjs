import { getWriters } from "@/lib/data";
import Link from "next/link";

export const metadata = {
  title: 'Writers',
  description: '작가들이지롱',
}

const Writers = async () => {
  const writers = await getWriters();
  console.log(writers[0]);
  console.log('tq', writers[0].nickname_history[0].nickname);
  
  return (
    <div>
      {writers.map((writer) => (
        <div key={writer._id}>
          {writer.id === "a"? writer.nickname :
            <span>
              <Link href={`/writers/${writer.id}`}>{writer.nickname_history[0].nickname}</Link>
            </span>
          }
          {writer.recommend}{writer.writer_id}{writer.writer_nickname}
        </div>
      ))}
    </div>
  );
}

export default Writers;