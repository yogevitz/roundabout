import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Roundabout from '../Roundabout';
import s from './App.scss';

class App extends React.Component {
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
        <Roundabout>
          <img src="https://picsum.photos/200/300" />
          <img src="https://picsum.photos/300/300" />
          <img src="https://picsum.photos/400/300" />
        </Roundabout>
      </div>
    );
  }
}

export default withTranslation()(App);
