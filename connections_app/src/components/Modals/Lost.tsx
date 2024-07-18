import styles from "./lost.module.css";

const Lost = () => {
  return (
    <div className={styles.modalBack}>
      <div className={styles.modalContainer}>
        <div>
          <h2>You are out of Mistakes</h2>
          <h2>Please try again!</h2>
        </div>
        <button className={styles.modal__closeBtn}>Close</button>
      </div>
    </div>
  );
};

export default Lost;
