import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import './grid.css';


const Grid = ({
  minItemWidth = '280px', 
  gap = 'md',
  align = 'stretch',
  justify = 'stretch',
  className = '',
  children,
  ...rest
}) => {
  const gridStyle = {
    '--grid-gap': `var(--space-${gap}, var(--grid-gap))`,
    '--grid-min-col-size': minItemWidth,
    '--grid-align-items': align,
    '--grid-justify-items': justify,
  };

  const classes = ['grid', className].filter(Boolean).join(' ');

  return (
    <Box
      as="div"
      className={classes}
      style={gridStyle}
      {...rest}
    >
      {children}
    </Box>
  );
};

Grid.propTypes = {
  minItemWidth: PropTypes.string,
  gap: PropTypes.oneOf(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  align: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
};

export default Grid;