import { dateFormat } from "@/lib/common";
import { getWriterCartoons, getWriterInfo } from "@/lib/data";
import styles from "./writerInfo.module.css";
import Paging from "@/components/Paging/paging";
import CartoonList from "@/components/cartoonsList/cartoonsList";
import Button from 'react-bootstrap/Button';
import Share from "@/components/share/share";
import { openGraphImage, twitterImage } from "@/app/shared-metadata";

export const generateMetadata = async ({params}) => {
  const resolvedParams = await params; // params를 await로 처리
  const { writerId } = resolvedParams;
  const writer = await getWriterInfo(writerId);
  return {
    title: writer.nickname,
    description: `${writer.nickname}의 만화 목록`,
    openGraph: {
      title: writer.nickname,
      description: `${writer.nickname}의 만화 목록`,
      url: new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/writers/${writer.id}`),
      siteName: "카연갤북마크",
      type: "website",
      ...openGraphImage,
    },
    twitter: {
      card: "summary_large_image",
      title: writer.nickname,
      description: `${writer.nickname}의 만화 목록`,
      ...twitterImage,
    },
  };
}

const WriterInfo = async ({ params, searchParams }) => {
  const resolvedParams = await params; // params를 await로 처리
  const sparams = await searchParams; // searchParams를 await로 처리
  const { writerId } = resolvedParams;
  const { page, prev } = sparams;
  const currentPage = (Number(page) > 0 ? Number(page) : 1);
  const writer = await getWriterInfo(writerId);
  const { cartoons, count, limit } = await getWriterCartoons(writerId, currentPage);
  const shareArgs = {
    thumb: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/twitter-image.png`,
    title: `작가 - ${writer.nickname}`,
    desc: `${writer.nickname}의 만화 목록`,
    rcmd: writer.recommend
  }

  return (
    <div className={styles.container}>
      {prev !== undefined && (
        <Button
          variant="secondary"
          className="m-2"
          size={"sm"}
          href={prev}
        >
          목록으로
        </Button>
      )}
      {/* <div>
        [{test.map((te, index) => (
          <div key={te.id}>
            &#123;"id":&nbsp;"{te.id}",&nbsp;"title":&nbsp;"{te.title}"&#125;
            {index < test.length - 1 ? ',' : ''}
          </div>
        ))}]
      </div> */}
      <div className={styles.nicknameWrapper}>
        <h2>
          <span className={styles.nickname}>{writer.nickname}</span>
          <span>님의 작품</span>
        </h2>
        <span className="text-secondary">총 {writer.count}</span>
      </div>
      <div className="d-flex gap-2">
        {writer.naver && (<div><Button href={writer.naver} target="_blank" variant="success">naver</Button></div>)}
        {writer.pixiv && (<div><Button href={writer.pixiv} target="_blank">pixiv</Button></div>)}
        {writer.x && (<div><Button href={writer.x} target="_blank" variant="dark">x</Button></div>)}
      </div>
      <div className={styles.infoWrapper}>
        {writer.nickname_history.length > 1 && (
          <div>
            <h4>닉네임 변경 기록</h4>
            <table>
              <thead>
                <tr>
                  <th>nickname</th>
                  <th>since</th>
                </tr>
              </thead>
              <tbody>
                {writer.nickname_history.map((history) => (
                  <tr key={history._id}>
                    <td>{history.nickname}</td>
                    <td>{dateFormat(history.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* <div className={styles.dates}>
          <span>첫 념글: {dateFormat(writer.first_date)}</span>
          <span>최근 활동일: {dateFormat(writer.last_date)}</span>
        </div>
        <div className={styles.infos}>
          <span>개추 총합: {writer.recommend}</span>
          <span>평균 개추: {writer.average}</span>
        </div> */}
      </div>
      <div className="d-flex align-items-center justify-content-between ps-2">
        <Button variant="outline-primary" size={"sm"} href={`/series?keyword=${writer.nickname}`}>시리즈 보기</Button>
        <Share shareArgs={shareArgs} />
      </div>
      <hr/>
      <ul>
        <CartoonList cartoons={cartoons} showWriter={false} />
      </ul>
      <Paging page={currentPage} perPage={limit} count={count} pageBtn={5} />
    </div>
  );
}

export default WriterInfo;