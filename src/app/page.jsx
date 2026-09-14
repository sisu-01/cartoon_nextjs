import Image from "next/image";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/poong.jpg"
        alt="카연갤의 기원"
        width={483}
        height={3184}
        sizes="(max-width: 800px) 100vw, 483px"
        priority
        fetchPriority="high"
        style={{
          width: '100%',
          height: 'auto',
        }}
        className={styles.img}
        />
    </div>
  );
}

export default HomePage;