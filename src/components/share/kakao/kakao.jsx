import { useEffect, useRef } from "react";

const Kakao = (param) => {
  const { shareArgs, handleClose } = param;
  const Kakao = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Kakao.current = window['Kakao'];
      if (!Kakao.current.isInitialized()) {
        Kakao.current.init(process.env.NEXT_PUBLIC_KAKAO);
      }
    }
  }, []);

  const handle = () => {
    handleClose();
    Kakao.current.Share.sendCustom({
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
  
  return (
    <div>
      <button id="kakaotalk-sharing-btn" onClick={handle}>kakao</button>
    </div>
  );
}

export default Kakao;