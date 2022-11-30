import React from 'react';
import classes from './Loader.module.css'

 /**
 *Переиспользуемый функциональный компонент,для визуального отображения загрузки
 */
const Loader = () => {
    return (
        <div className={classes.Loader}> </div>
    );
};

export default Loader;