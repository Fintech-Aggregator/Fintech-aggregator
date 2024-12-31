import styles from "../styles/main-page.module.css";
import Image1 from "../images/image1.jpg";
import Image2 from "../images/image2.jpg";

export default function Content() {
  return (
    <div className={styles.template}>
      <div className={styles.block1}>
        
        {/* <img src={Image1.src} className={styles.image1} /> */}
        
        <div className={styles.text_overlay1}>
          <h1>Your key to fintech licenses Fast, Accurate, Convenient</h1>
        </div>
                
      </div>
      
      <div className={styles.text_between}>
        
        <div className={styles.text_bet}>
          <p>Our service empowers to quickly find <br/>
          up-to-date information on fintech company licenses </p>  
        </div>
        <button className={styles.button}>Find Licenses</button>
        
      </div>
      
      <div className={styles.block2}>
        
        <img src={Image2.src} className={styles.image2} />
        
        <div className={styles.text_overlay2}>
          <h2>We are a team of enthusiasts who strive to make financial information
          more accessible, transparent and user-friendly.</h2>
        </div>
        
      </div>
    </div>
  );
}
