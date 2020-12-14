import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Roundabout from '../Roundabout';
import { Box } from 'wix-style-react';
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
        <Box align="center">
          <div className={s.roundabout}>
            <div style={{ background: '#bdeabc' }}>
              <p>REVEAL_ONE:</p>
              <Roundabout
                slidingType="REVEAL_ONE"
                images={[
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/600/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/300/300',
                  'https://picsum.photos/700/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/800/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/300/300',
                  'https://picsum.photos/600/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/800/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/700/300',
                ]}
              />
            </div>
            <div style={{ background: '#eabcbc' }}>
              <p>REVEAL_CHUNK:</p>
              <Roundabout
                slidingType="REVEAL_CHUNK"
                images={[
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/600/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/300/300',
                  'https://picsum.photos/700/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/800/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/300/300',
                  'https://picsum.photos/600/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/800/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/700/300',
                ]}
              />
            </div>
            <div style={{ background: '#bcbdea' }}>
              <p>ALIGN_NEXT:</p>
              <Roundabout
                slidingType="ALIGN_NEXT"
                images={[
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/600/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/300/300',
                  'https://picsum.photos/700/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/800/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/300/300',
                  'https://picsum.photos/600/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/200/300',
                  'https://picsum.photos/800/300',
                  'https://picsum.photos/500/300',
                  'https://picsum.photos/400/300',
                  'https://picsum.photos/700/300',
                ]}
              />
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

export default withTranslation()(App);
