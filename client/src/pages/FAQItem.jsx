import { useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./FAQs.module.css";
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentHeight = useRef();
  return (
    //  <div className={styles["wrapper"]} >
    //  <button className={`${styles["question-container"]} ${isOpen ? styles.active : ''}`} onClick={onClick} >
    //   <p className={styles['question-content']}>{question}</p>
    //   <RiArrowDropDownLine className={`${styles["arrow"]} ${isOpen ? styles.active : ''}`} />
    //  </button>

    //   <div ref={contentHeight} className={styles["answer-container"]} style={
    //        isOpen
    //        ? { height: contentHeight.current.scrollHeight }
    //        : { height: "0px" }
    //       }>
    //    <p className={styles["answer-content"]}>{answer}</p>
    //   </div>
    // </div>

    <div className={styles["accordian"]}>
      <div className={`${styles["item"]}`}>
        <div className={`${styles["question"]} ${isOpen ? styles.active:""}`} onClick={onClick}>
          <p>{question}</p>
          <IoIosArrowDown className={`${styles["arrow"]} ${isOpen ? styles.active:""}`}/>
        </div>
        <div ref={contentHeight} className={`${styles["answer-container"]}`} style={ isOpen ? { height: contentHeight.current.scrollHeight }: { height: "0px" }}>
          <div className={`${styles["answer"]} ${isOpen ? styles.active:""}`}>{answer}</div>
        </div>
      </div>
    </div>
  );
};
export default FAQItem;
