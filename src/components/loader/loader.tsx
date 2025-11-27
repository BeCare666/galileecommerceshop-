import styles from './preloader.module.css';

export default function Preloader() {
  return (
    <div className={styles.loaderContainer}>
      <p className={styles.textspin}></p>
      <p className={styles.textspin}></p>
      <p className={styles.textspin}></p>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
{ /**      <img
        src="https://galileecommerce.com/img/logo_red.png"
        alt="logo"
        className={styles.logo}
              <p className={styles.text}>GalileeCommerce !</p>
      />**/ }