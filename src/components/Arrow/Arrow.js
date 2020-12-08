import React from 'react';
import { IconButton } from 'wix-style-react';
import classes from './Arrow.scss';

const skinPriorityMap = {
  standard: 'secondary',
  inverted: 'primary',
  light: 'primary',
  transparent: 'primary',
  premium: 'primary',
};

const Arrow = ({
  dataHook = '',
  arrowSize = 'medium',
  buttonSkin = 'standard',
  icon = <div />,
  className = '',
  disabled = false,
  ...remainingProps
}) => (
  <div {...remainingProps} data-hook={dataHook} className={className}>
    <IconButton
      className={classes.arrows}
      skin={buttonSkin}
      size={arrowSize}
      disabled={disabled}
      priority={skinPriorityMap[buttonSkin]}
    >
      {icon}
    </IconButton>
  </div>
);

export default Arrow;
