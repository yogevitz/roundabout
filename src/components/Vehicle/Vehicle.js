import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './Vehicle.scss';

class Vehicle extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <h2 className={s.title} data-hook="app-title">
          {t('app.title')}
        </h2>
      </div>
    );
  }
}

export default withTranslation()(Vehicle);