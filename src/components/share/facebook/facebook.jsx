import styles from "../share.module.css";

const app_id = process.env.NEXT_PUBLIC_FACEBOOK;

const Facebook = (param) => {
  const { shareUrl, handleClose } = param;
  const url =`https://www.facebook.com/share_channel/?type=reshare&link=${encodeURIComponent(shareUrl)}&app_id=${app_id}&source_surface=external_reshare&display&hashtag#`;
 
  const handle = () => {
    handleClose();
    window.open(url, '_blank', 'width=680,height=850');
  }
  return (
    <li>
      <a className={styles.facebook} onClick={handle}>
        <span>페이스북</span>
      </a>
    </li>
  );
}

export default Facebook;