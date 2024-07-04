import { useEffect, useRef } from "react";
import styles from "../share.module.css";

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
    <li>
      <a className={styles.a} onClick={handle}>
        <span>카카오톡</span>
      </a>
    </li>
  );
}

export default Kakao;