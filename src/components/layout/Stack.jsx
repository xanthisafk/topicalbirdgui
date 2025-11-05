import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import './stack.css';


const Stack = forwardRef(({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  children,
  ...rest
}, ref) => {
  const stackStyle = {
    '--stack-gap': `var(--space-${spacing}, 0)`,
    
    '--stack-align': align,
    '--stack-justify': justify,
  };

  const classes = [
    'stack',
    `stack--${direction}`,
    wrap && 'stack--wrap',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Box
      as="div"
      className={classes}
      style={stackStyle}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
});

Stack.propTypes = {
  direction: PropTypes.oneOf(['column', 'row', 'column-reverse', 'row-reverse']),
  spacing: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  align: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'evenly']),
  wrap: PropTypes.bool,
  as: PropTypes.string,
};


const Row = forwardRef((props, ref) => (
  <Stack direction="row" {...props} ref={ref} />
));


const Column = forwardRef((props, ref) => (
  <Stack direction="column" {...props} ref={ref} />
));


Row.propTypes = Stack.propTypes;
Column.propTypes = Stack.propTypes;

export { Row, Column };
export default Stack;