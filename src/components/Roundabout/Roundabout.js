import React from 'react';
import PropTypes from 'prop-types';
import Vehicle from '../Vehicle';

class Roundabout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={className}>
        {[children].map((child, key) => (
          <Vehicle key={key}>{child}</Vehicle>
        ))}
      </div>
    );
  }
}

export default Roundabout;
