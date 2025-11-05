import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import '@/styles/components/Container.css';

const Container = ({
  children,
  maxWidth = 'var(--container-max)',
  padding = 'lg',
  align = 'center',
  className = '',
  ...rest
}) => {
  const containerStyle = {
    '--container-max-width': maxWidth.startsWith('var(') ? maxWidth : maxWidth.includes('px') ? maxWidth : `var(--size-${maxWidth}, ${maxWidth})`,
  };

  const classes = [
    'container',
    `container--align-${align}`,
    `container--padding-v-${padding}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Box
      className={classes}
      style={containerStyle}
      {...rest}
    >
      {children}
    </Box>
  );
};

Container.propTypes = {
  maxWidth: PropTypes.string,
  padding: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
  align: PropTypes.oneOf(['left', 'center']),
};

export default Container;