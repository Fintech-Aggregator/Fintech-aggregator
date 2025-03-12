import React from 'react'
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  onOpenModal: () => void;
};

const Footer = () => {
  return (
    <>
      <hr className={styles.fullWidthLine}/>
      
      <footer className={styles.mainFooter}>
        
        <div className={styles.firstBlockFooter}>
          <div className={styles.firstBlockImages}>
            <Image src="/instagram.svg" alt="inst" width={40} height={40} />
            <Image src="/facebook.svg" alt="facebook" width={40} height={40} />
            <Image src="/linkedin.svg" alt="linkedin" width={40} height={40} />
          </div>
          
          <span className={styles.textRev}>Help us improve our work</span>
          
          <div className={styles.writeReviewBox}>
            <Link href="/">
              <span className={styles.linkReview}>Write a review</span>
            </Link>
          </div>
        </div>
        
        <div className={styles.secondBlockFooter}>
          
          <div className={styles.secondBlockText}>
            <span className={styles.styleText}>Company</span>
            <span className={styles.styleText2}>About company</span>
            <span className={styles.styleText2}>Contacts</span>            
          </div>
          <div className={styles.secondBlockText}>
            <span className={styles.styleText}>Services</span>
            <span className={styles.styleText2}>Service agreements</span>
            <span className={styles.styleText2}>Partners</span>
          </div>
          <div className={styles.secondBlockText}>
            <span className={styles.styleText}>Help</span>
            <span className={styles.styleText2}>Terms of use of this site</span>
            <span className={styles.styleText2}>Press Center</span>
          </div>
          
        </div>
      </footer>
    
    </>
  )
}

export default Footer