import React from 'react';

import styles from './styles.module.css';

function Separator({children}) {
  return (
    <div className={styles.separator} >
        <div className={styles.top_separator} />
        <div className={styles.bottom_separator} />
    </div>
  );
}

export default Separator;