import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <h1 className={styles.tytle}>Creative thoughts agency</h1>
        <p className={styles.desc}>Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsum</p>
        <div className={styles.buttons}>
          <div className={styles.button}>Learn more</div>
          <div className={styles.button}>Contact</div>

        </div>
        <div className={styles.brands}>
          <Image src='/brands.png' alt='' fill/>
        </div>
      </div>
      <div className={styles.img_container}>
        <Image src='/hero.gif' alt='' fill className={styles.heroImg}/>
      </div>
    </div>
  );
}
