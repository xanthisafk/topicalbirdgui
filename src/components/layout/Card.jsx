import PropTypes from 'prop-types';
import Box from './Box';
import './card.css';

const CardHeader = (props) => (
  <Box as="header" className="card__header" {...props} />
);
const CardBody = (props) => (
  <Box as="div" className="card__body" {...props} />
);
const CardFooter = (props) => (
  <Box as="footer" className="card__footer" {...props} />
);

/**
 * @param {string} bg - Background color (references theme scale).
 * @param {string} shadow - Shadow style (references --shadow-* scale).
 * @param {string} radius - Border radius (references --radius-* scale).
 * @param {object} rest - Other props passed to the main Box.
 */
const Card = ({
  bg = 'background-color-light',
  shadow = 'md',
  radius = 'md',
  className = '',
  children,
  ...rest
}) => {
  const cardStyle = {
    '--card-bg': `var(--${bg})`,
    '--card-shadow': `var(--shadow-${shadow})`,
    '--card-radius': `var(--radius-${radius})`,
  };

  const classes = ['card', className].filter(Boolean).join(' ');

  return (
    <Box
      as="section"
      role="region"
      className={classes}
      style={cardStyle}
      {...rest}
    >
      {children}
    </Box>
  );
};

Card.propTypes = {
  bg: PropTypes.string,
  shadow: PropTypes.oneOf(['none', 'soft', 'md', 'strong', 'glow']),
  radius: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'round']),
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;