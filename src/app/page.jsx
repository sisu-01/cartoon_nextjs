import Image from "next/image";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Image src="/poong.jpg" alt="" style={{
        width: '100%',
        height: 'auto',
      }}
      width={400}
      height={3000} className={styles.img} />
    </div>
  );
}

export default HomePage;