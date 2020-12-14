import React from 'react';
import Vehicle from '../Vehicle';
import Arrow from '../Arrow';
import ChevronLeftSmall from 'wix-ui-icons-common/ChevronLeftSmall';
import ChevronRightSmall from 'wix-ui-icons-common/ChevronRightSmall';
import { animate, isWhollyInView, nop, normalizeIndex } from '../../utils';
import { Box } from 'wix-style-react';

const TRANSITION_SPEED = 600;
const CONTROLS_START_END = {
  HIDDEN: 'HIDDEN',
  DISABLED: 'DISABLED',
};
const SLIDING_TYPE = {
  REVEAL_ONE: 'REVEAL_ONE',
  REVEAL_CHUNK: 'REVEAL_CHUNK',
  ALIGN_NEXT: 'ALIGN_NEXT',
};
const ALIGNMENT = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

export default class Roundabout extends React.Component {
  static defaultProps = {
    afterSlide: nop,
    beforeSlide: nop,
    animationDuration: TRANSITION_SPEED,
    gutter: '6px',
    onVehicleClick: nop,
    startOffset: 0,
    endOffset: 0,
    startAt: 0,
    style: {},
    controlsSkin: 'standard',
    infinite: false,
    controlsStartEnd: CONTROLS_START_END.DISABLED,
    images: [],
    slidingType: SLIDING_TYPE.REVEAL_ONE,
  };

  constructor(props) {
    super(props);
    this.loadingImagesCount = 0;
    this.visibleVehicles = [];
    this.state = {
      activeIndex: this.props.startAt,
      isAnimating: false,
      isLeftArrowDisabled: true,
      isRightArrowDisabled: true,
    };
  }

  componentDidMount() {
    const { startAt, images } = this.props;
    this.childCount = this.roundabout?.children?.length || images.length || 0;
    this.setImgOnLoadHandlers();
    if (!this.loadingImagesCount) {
      this.slideTo({ index: startAt, immediate: true }).catch(nop);
      this.setVisibleVehicles();
    }
  }

  onImageLoad = () => {
    this.loadingImagesCount--;
    if (!this.loadingImagesCount) {
      this.slideTo({ index: this.props.startAt, immediate: true }).catch(nop);
    }
  };

  setImgOnLoadHandlers = () => {
    [...this.roundabout.children].forEach((child) => {
      const childImages = [...child.getElementsByTagName('img')];
      childImages.forEach((img) => {
        this.loadingImagesCount++;
        img.onload = this.onImageLoad;
        img.onerror = this.onImageLoad;
      });
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
    this.setState({
      isLeftArrowDisabled: !infinite && this.visibleVehicles[0] === 0,
      isRightArrowDisabled:
        !infinite && this.visibleVehicles[1] === childCount - 1,
    });
  };

  slideTo = (
    { index, alignTo, immediate } = {
      index: 0,
      alignTo: ALIGNMENT.LEFT,
      immediate: false,
    },
  ) => {
    console.log({ index, alignTo, immediate });
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
      endOffset,
    } = this.props;
    const { children, scrollLeft, offsetWidth } = this.roundabout;
    const slideIndex = normalizeIndex(index, this.childCount, infinite);
    const startingIndex = this.state.activeIndex;
    let delta;
    if (alignTo === ALIGNMENT.RIGHT) {
      delta =
        children[slideIndex].offsetWidth -
        (offsetWidth - children[slideIndex].offsetLeft) -
        scrollLeft +
        endOffset;
    } else {
      delta = children[slideIndex].offsetLeft - scrollLeft - startOffset;
    }
    console.log({ delta });
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
    const { slidingType, infinite } = this.props;
    const [firstVisibleChild, lastVisibleChild] = this.visibleVehicles;
    let nextVehicle, alignTo;
    if (
      [SLIDING_TYPE.REVEAL_CHUNK, SLIDING_TYPE.REVEAL_ONE].includes(slidingType)
    ) {
      if (lastVisibleChild === this.childCount - 1) {
        nextVehicle = infinite ? 0 : lastVisibleChild;
      } else {
        nextVehicle = lastVisibleChild + 1;
      }
      alignTo =
        slidingType === SLIDING_TYPE.REVEAL_CHUNK
          ? ALIGNMENT.LEFT
          : ALIGNMENT.RIGHT;
    } else {
      if (firstVisibleChild === this.childCount - 1) {
        nextVehicle = infinite ? 0 : firstVisibleChild;
      } else {
        nextVehicle = firstVisibleChild + 1;
      }
      alignTo = ALIGNMENT.LEFT;
    }
    return this.slideTo({ index: nextVehicle, alignTo });
  };

  prev = () => {
    const { slidingType, infinite } = this.props;
    const [firstVisibleChild, _] = this.visibleVehicles;
    let prevVehicle, alignTo;
    if (
      [SLIDING_TYPE.REVEAL_CHUNK, SLIDING_TYPE.REVEAL_ONE].includes(slidingType)
    ) {
      if (firstVisibleChild === 0) {
        prevVehicle = infinite ? this.childCount - 1 : firstVisibleChild;
      } else {
        prevVehicle = firstVisibleChild - 1;
      }
      alignTo =
        slidingType === SLIDING_TYPE.REVEAL_CHUNK
          ? ALIGNMENT.RIGHT
          : ALIGNMENT.LEFT;
    } else {
      if (firstVisibleChild === 0) {
        prevVehicle = infinite ? this.childCount - 1 : 0;
      } else {
        prevVehicle = firstVisibleChild - 1;
      }
      alignTo = ALIGNMENT.LEFT;
    }
    return this.slideTo({ index: prevVehicle, alignTo });
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
      endOffset,
      onVehicleClick,
      vehicleClass,
      slideTo,
      startAt,
      style,
      controlsSkin,
      controlsStartEnd,
      images,
      slidingType,
      ...props
    } = this.props;
    const { isLeftArrowDisabled, isRightArrowDisabled } = this.state;

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
        {(!isLeftArrowDisabled ||
          controlsStartEnd === CONTROLS_START_END.DISABLED) && (
          <Box align="center" marginBottom={3}>
            <Arrow
              icon={<ChevronLeftSmall />}
              onClick={this.prev}
              controlsSkin={controlsSkin}
              disabled={isLeftArrowDisabled}
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
          {images.length
            ? images.map((image, i) => (
                <Vehicle
                  className={vehicleClass}
                  key={`slide-${i}`}
                  basis="auto"
                  gutter={i > 0 ? gutter : ''}
                  onClick={onVehicleClick}
                  role="listitem"
                  image={image}
                />
              ))
            : React.Children.map(children, (child, i) => (
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
        {(!isRightArrowDisabled ||
          controlsStartEnd === CONTROLS_START_END.DISABLED) && (
          <Box align="center" marginTop={3}>
            <Arrow
              icon={<ChevronRightSmall />}
              onClick={this.next}
              controlsSkin={controlsSkin}
              disabled={isRightArrowDisabled}
            />
          </Box>
        )}
      </React.Fragment>
    );
  }
}
