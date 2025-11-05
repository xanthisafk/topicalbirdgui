import React from 'react';
import './box.css';

/**
 * @param {string} htmlAs - The HTML element type to render
 * @param {string} p - Padding
 * @param {string} m - Margin
 * @param {string} bg - Background color 
 * @param {string} c - Text color
 * @param {string} className - CSS classes
 * @param {object} rest - rest of the props
 */
const Box = ({
    htmlAs = 'div',
    p,
    m,
    bg,
    c,
    className = '',
    ...rest
}) => {
    const styleProps = {};

    if (p) styleProps['--p-value'] = `var(--space-${p})`;
    if (m) styleProps['--m-value'] = `var(--space-${m})`;
    if (bg) styleProps['--bg-color'] = `var(--${bg}-color)`;
    if (c) styleProps['--text-color'] = `var(--${c}-color)`;

    const boxClasses = ['box', className].filter(Boolean).join(' ');

    return (
        <Element
            role={htmlAs}
            className={boxClasses}
            style={styleProps}
            {...rest}
        />
    );
};

export default Box;