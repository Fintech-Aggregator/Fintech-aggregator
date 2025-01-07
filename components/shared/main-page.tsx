import styles from "./HomeContentTemaplate/main-page.module.css";
import Image3 from "./images/image3.png";
import Image2 from "./images/image2.jpg";

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
        
        <div className={styles.template_between}>
          <div className={styles.text_bet}>
            <h1>What exactly does our service do?</h1>
            
            <h2>
            Our service enables users to efficiently<br/>
            access accurate and up-to-date information<br/>
            about fintech company licenses.
            </h2>  
          </div>
          
          <div className={styles.button_container}>
            <button className={styles.button}>Find Licenses</button>  
          </div>
        </div>
        
        <div className={styles.containerImage}>
          <img src={Image3.src} className={styles.image3}/>
        </div>
        
      </div>
      
      <div className={styles.block2}>
        
        <img src={Image2.src} className={styles.image2} />
        
        <div className={styles.text_overlay2}>
          We are a team of enthusiasts who strive to make financial information <br/>
          more accessible, transparent and user-friendly.
        </div>
        
      </div>
    </div>
  );
}
