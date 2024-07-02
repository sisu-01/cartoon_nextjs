import { useEffect } from "react";

const Kakao = (param) => {
  const { shareArgs } = param;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO);
      }

      Kakao.Share.createCustomButton({
        // #kakaotalk-sharing-btn id를 가진 요소에 공유 버튼을 생성하도록 함
        container: "#kakaotalk-sharing-btn",
        templateId: 109641,
        templateArgs: {
          THUMB: shareArgs.thumb,
          TITLE: shareArgs.title,
          DESC: shareArgs.desc,
          RCMD: shareArgs.rcmd,
          PATH: shareArgs.path,
        }
      });
    }
  }, []);
  
  return (
    <div>
      <button id="kakaotalk-sharing-btn">kakao</button>
    </div>
  );
}

export default Kakao;