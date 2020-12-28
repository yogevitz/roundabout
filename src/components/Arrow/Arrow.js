import React from 'react';
import { IconButton } from 'wix-style-react';

const skinPriorityMap = {
  standard: 'secondary',
  inverted: 'primary',
  light: 'primary',
  transparent: 'primary',
  premium: 'primary',
};

const Arrow = ({
  dataHook,
  arrowSize,
  controlsSkin,
  icon,
  className,
  disabled = false,
  ...remainingProps
}) => (
  <div {...remainingProps} data-hook={dataHook} className={className}>
    <IconButton
      skin={controlsSkin}
      size={arrowSize}
      disabled={disabled}
      priority={skinPriorityMap[controlsSkin]}
    >
      {icon}
    </IconButton>
  </div>
);

export default Arrow;
