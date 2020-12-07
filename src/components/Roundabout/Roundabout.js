import React from 'react';
import PropTypes from 'prop-types';
import Vehicle from '../Vehicle';
import Arrow from '../Arrow';
import ChevronLeftSmall from 'wix-ui-icons-common/ChevronLeftSmall';
import ChevronRightSmall from 'wix-ui-icons-common/ChevronRightSmall';

class Roundabout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={className}>
        <Arrow icon={<ChevronLeftSmall />} />
        {[children].map((child, key) => (
          <Vehicle key={key}>{child}</Vehicle>
        ))}
        <Arrow icon={<ChevronRightSmall />} />
      </div>
    );
  }
}

export default Roundabout;
