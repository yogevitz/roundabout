import React from 'react';
import Vehicle from '../Vehicle';
import Arrow from '../Arrow';
import ChevronLeftSmall from 'wix-ui-icons-common/ChevronLeftSmall';
import ChevronRightSmall from 'wix-ui-icons-common/ChevronRightSmall';
import {
  animate,
  isImage,
  isWhollyInView,
  nop,
  normalizeIndex,
  values,
} from '../../utils';
import { Box } from 'wix-style-react';

const TRANSITION_SPEED = 600;

export default class Roundabout extends React.Component {
  static defaultProps = {
    afterSlide: nop,
    beforeSlide: nop,
    animationDuration: TRANSITION_SPEED,
    gutter: '6px',
    onVehicleClick: nop,
    startOffset: 0,
    startAt: 0,
    style: {},
    buttonSkin: 'standard',
    infinite: false,
  };

  constructor(props) {
    super(props);
    this.loadingImagesCount = 0;
    this.visibleVehicles = [];
    this.state = {
      activeIndex: this.props.startAt,
      isAnimating: false,
      isShowLeftArrow: false,
      isShowRightArrow: false,
    };
  }

  componentDidMount() {
    this.childCount = this.roundabout?.children?.length || 0;
    this.setOnLoadHandlersForImages();
    if (!this.loadingImagesCount) {
      this.slideTo(this.props.startAt, { immediate: true }).catch(nop);
      this.setVisibleVehicles();
    }
  }

  onImageLoad = () => {
    this.loadingImagesCount--;
    if (!this.loadingImagesCount) {
      this.slideTo(this.props.startAt, { immediate: true }).catch(nop);
    }
  };

  setOnLoadHandlersForImages = () => {
    [...this.roundabout.children].forEach((child) => {
      const childInnerElement = child.firstElementChild;
      if (isImage(childInnerElement)) {
        this.loadingImagesCount++;
        childInnerElement.onload = this.onImageLoad;
      }
    });
  };

  setVisibleVehicles = () => {
    const { props, roundabout, childCount } = this;
    const { infinite } = props;
    const firstVisibleChild = Math.max(
      [...roundabout.children].findIndex((child) =>
        isWhollyInView(roundabout)(child),
      ),
      0,
    );
    const lastVisibleChild = Math.max(
      [...roundabout.children].findIndex(
        (child, i, children) =>
          isWhollyInView(roundabout)(child) &&
          (i === children.length - 1 ||
            !isWhollyInView(roundabout)(children[i + 1])),
      ),
      0,
    );
    this.visibleVehicles = [firstVisibleChild, lastVisibleChild];
    console.log('this.visibleVehicles', this.visibleVehicles);
    this.setState({
      isShowLeftArrow: infinite || this.visibleVehicles[0] !== 0,
      isShowRightArrow: infinite || this.visibleVehicles[1] !== childCount - 1,
    });
  };

  slideTo = (index, { immediate = false } = {}) => {
    if (this.childCount === 0) {
      return Promise.reject('No children to slide to');
    }
    if (!this.roundabout) {
      return Promise.reject('The Roundabout is not mounted');
    }
    const {
      afterSlide,
      beforeSlide,
      easing,
      animationDuration: duration,
      infinite,
      startOffset,
    } = this.props;
    const { children, scrollLeft } = this.roundabout;
    const slideIndex = normalizeIndex(index, this.childCount, infinite);
    const startingIndex = this.state.activeIndex;
    const delta = children[slideIndex].offsetLeft - scrollLeft - startOffset;
    if (startingIndex !== slideIndex) {
      beforeSlide(index);
    }
    this.setState({ isAnimating: true, activeIndex: slideIndex });
    return new Promise((res, _) => {
      if (immediate) {
        this.roundabout.scrollLeft = children[slideIndex].offsetLeft;
        return res();
      } else {
        const originalOverflowX = 'hidden';
        const prop = 'scrollLeft';
        return res(
          animate(this.roundabout, {
            prop,
            delta,
            easing,
            duration,
            originalOverflowX,
          }),
        );
      }
    })
      .then(() => {
        this.setState({ isAnimating: false });
        this.setVisibleVehicles();
        if (startingIndex !== slideIndex) {
          return afterSlide(slideIndex);
        }
      })
      .catch((_) => {
        this.setVisibleVehicles();
        this.setState({ isAnimating: false });
      });
  };

  next = () => {
    const { infinite } = this.props;
    const [_, lastVisibleChild] = this.visibleVehicles;
    let nextVehicle;
    if (lastVisibleChild === this.childCount - 1) {
      nextVehicle = infinite ? 0 : lastVisibleChild;
    } else {
      nextVehicle = lastVisibleChild + 1;
    }
    return this.slideTo(nextVehicle);
  };

  prev = () => {
    const { infinite } = this.props;
    const [firstVisibleChild, _] = this.visibleVehicles;
    let prevVehicle;
    if (firstVisibleChild === 0) {
      prevVehicle = infinite ? this.childCount - 1 : 0;
    } else {
      prevVehicle = firstVisibleChild - 1;
    }
    return this.slideTo(prevVehicle);
  };

  setRef = (r) => {
    this.roundabout = r;
  };

  render() {
    const {
      afterSlide,
      beforeSlide,
      animationDuration,
      children,
      className,
      easing,
      infinite,
      gutter,
      startOffset,
      onVehicleClick,
      vehicleClass,
      slideTo,
      startAt,
      style,
      buttonSkin,
      ...props
    } = this.props;
    const { isShowLeftArrow, isShowRightArrow } = this.state;

    const styles = {
      display: 'flex',
      flexFlow: 'row nowrap',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'all .25s ease-in-quint',
      outline: 'none',
    };

    return (
      <React.Fragment>
        {isShowLeftArrow && (
          <Box align="center" marginBottom={3}>
            <Arrow
              icon={<ChevronLeftSmall />}
              onClick={this.prev}
              buttonSkin={buttonSkin}
            />
          </Box>
        )}
        <div
          className={className}
          style={{ ...style, ...styles }}
          tabIndex="0"
          role="list"
          ref={this.setRef}
          {...props}
        >
          {React.Children.map(children, (child, i) => (
            <Vehicle
              className={vehicleClass}
              key={`slide-${i}`}
              basis="auto"
              gutter={i > 0 ? gutter : ''}
              onClick={onVehicleClick}
              role="listitem"
            >
              {child}
            </Vehicle>
          ))}
        </div>
        {isShowRightArrow && (
          <Box align="center" marginTop={3}>
            <Arrow
              icon={<ChevronRightSmall />}
              onClick={this.next}
              buttonSkin={buttonSkin}
            />
          </Box>
        )}
      </React.Fragment>
    );
  }
}
