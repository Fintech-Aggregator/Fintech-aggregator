import styles from "./HomeContentTemaplate/main-page.module.css";


export default function Content() {
  return (
    <div className={styles.template}>
      <div className={styles.block1}>
        
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
        </div>
        
      </div>
      
      <div className={styles.block2}>

        
        <div className={styles.text_overlay2}>
        The project was completed by a team of 6 people with an average <br/>
        of XX hours spent by each person. 
        </div>
        
      </div>
      
      <div className={styles.text_between}>
      
      <div className={styles.containerImage1}>
      </div>
      
        <div className={styles.template_between}>
          <div className={styles.text_bet1}>
            <h1>Why you should choose us?</h1>
            
            <h2>
            We provide access to data on licenses, owners, types of activities, 
            and compliance with regulatory requirements which will help increase 
            market transparency. We make it easier for you to choose your partners, 
            as you can easily find the information 
            you need by country, license type of activity, owners, etc.
            </h2>
            
          </div>
        </div>
        
      </div>
      
      <div className={styles.block3}>
        
        <div className={styles.text_overlay2}>
          We are a team of enthusiasts who strive to make financial information <br/>
          more accessible, transparent and user-friendly.
        </div>
        
      </div>
        
    </div>
  );
}
