import PropTypes from 'prop-types';
import './Loading.css';

export const Loading = ({ size = 'medium', className = '' }) => {
    return <div className={`loading loading-${size} ${className}`} data-testid="loading"></div>;
};

Loading.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
};