import styles from './Messages.module.css'

function Messages() {
  return (
    <>
      <div className={styles.messages}>
        <div className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p className="title">Super Project title</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              laudantium error quaerat labore, assumenda accusamus, quos eveniet
              optio porro...
            </p>
          </div>
          <div className="card-icons" />
        </div>

        <div className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p className="title">Super Project title</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              laudantium error quaerat labore, assumenda accusamus, quos eveniet
              optio porro...
            </p>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p className="title">Super Project title</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              laudantium error quaerat labore, assumenda accusamus, quos eveniet
              optio porro...
            </p>
          </div>
          <div className="card-icons"> </div>
        </div>
        <div className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p className="title">Super Project title</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              laudantium error quaerat labore, assumenda accusamus, quos eveniet
              optio porro...
            </p>
          </div>
          <div className="card-icons"></div>
        </div>
        <div className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p className="title">Super Project title</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              laudantium error quaerat labore, assumenda accusamus, quos eveniet
              optio porro...
            </p>
          </div>
          <div className="card-icons"></div>
        </div>
        <div className={styles.message}>
          <div className={styles.stripe}></div>
          <div className={styles.cardContent}>
            <p className="title">Super Project title</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              laudantium error quaerat labore, assumenda accusamus, quos eveniet
              optio porro...
            </p>
          </div>
          <div className="card-icons"></div>
        </div>
      </div>
    </>
  );
}

export default Messages;
