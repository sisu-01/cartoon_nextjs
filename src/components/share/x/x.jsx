import styles from "../share.module.css";

const X = (param) => {
  const { title, shareUrl, handleClose } = param;
  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(title+" (출처 : 카툰-연재 갤러리)")}&url=${encodeURIComponent(shareUrl)}`;
  const handle = () => {
    handleClose();
    window.open(xUrl, '_blank', 'width=640,height=440');
  }
  return (
    <li>
      <a className={styles.x} onClick={handle}>
        <span>X</span>
      </a>
    </li>
  );
}

export default X;