import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Roundabout from '../Roundabout';
import { Box, Card, MarketingLayout, Button } from 'wix-style-react';
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
            <div style={{ marginBottom: '50px' }}>
              <p>REVEAL_ONE:</p>
              <div style={{ marginBottom: '20px' }}>
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
              <Roundabout slidingType="REVEAL_ONE">
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 1"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 2"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 3"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 4"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 5"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 6"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 7"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
              </Roundabout>
            </div>
            <div style={{ marginBottom: '50px' }}>
              <p>REVEAL_CHUNK:</p>
              <div style={{ marginBottom: '20px' }}>
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
              <Roundabout slidingType="REVEAL_CHUNK">
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 1"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 2"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 3"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 4"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 5"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 6"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 7"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
              </Roundabout>
            </div>
            <div style={{ marginBottom: '50px' }}>
              <p>ALIGN_NEXT:</p>
              <div style={{ marginBottom: '20px' }}>
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
              <Roundabout slidingType="ALIGN_NEXT">
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 1"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 2"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 3"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 4"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 5"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 6"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
                <Box maxWidth="600px" className={s.card}>
                  <Card>
                    <MarketingLayout
                      title="Card 7"
                      description="This layout requires less attention. It can promote side features that might add value, but are not mandatory to achieve main goals."
                      actions={<Button size="small">Get Started</Button>}
                      size="tiny"
                      image={<img src="https://picsum.photos/100/100" />}
                    />
                  </Card>
                </Box>
              </Roundabout>
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

export default withTranslation()(App);
