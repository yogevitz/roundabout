import React from 'react';
import Vehicle from '../Vehicle';
import Arrow from '../Arrow';
import ChevronLeftSmall from 'wix-ui-icons-common/ChevronLeftSmall';
import ChevronRightSmall from 'wix-ui-icons-common/ChevronRightSmall';
import {
  animate,
  isWhollyInView,
  nop,
  normalizeIndex,
  values,
} from '../../utils';

class Roundabout extends React.Component {
  static defaultProps = {
    afterSlide: nop,
    beforeSlide: nop,
    animationDuration: 500,
    gutter: '1em',
    onVehicleClick: nop,
    preventAutoCorrect: false,
    snapPositionOffset: 0,
    snapToSlide: false,
    startAt: 0,
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.startAt,
      isAnimating: false,
    };
  }

  componentDidMount() {
    this.childCount =
      this.roundabout && this.roundabout.children
        ? this.roundabout.children.length
        : 0;

    this.slideTo(this.props.startAt, { immediate: true }).catch(nop);
  }

  componentWillUnmount() {
    this.eventListeners.forEach((fn) => typeof fn === 'function' && fn());
  }

  componentDidUpdate(prevProps) {
    this.childCount =
      this.roundabout && this.roundabout.children
        ? this.roundabout.children.length
        : 0;

    if (this.shouldSelfCorrect()) {
      const nearestSlideIndex = this.getNearestSlideIndex();
      nearestSlideIndex !== this.state.activeIndex &&
        this.slideTo(this.getNearestSlideIndex()).catch(nop);
    }

    if (prevProps.slideTo !== this.props.slideTo) {
      this.slideTo(this.props.slideTo).catch(nop);
    }
  }

  shouldComponentUpdate(nextProps, { isAnimating }) {
    const propValues = [...values(this.props), this.state.isAnimating];
    const nextPropValues = [...values(nextProps), isAnimating];
    return !nextPropValues.every((val, i) => val === propValues[i]);
  }

  canSelfCorrect = () =>
    !this.props.preventAutoCorrect && !this.state.isAnimating;

  shouldSelfCorrect = () => this.props.snapToSlide && this.canSelfCorrect();

  getNearestSlideIndex = () => {
    const { children, scrollLeft } = this.roundabout;
    const offsets = [].slice
      .call(children)
      .map(({ offsetLeft }) => Math.abs(offsetLeft - scrollLeft));
    return offsets.indexOf(Math.min(...offsets));
  };

  getPartiallyObscuredSlides = () => {
    const { roundabout } = this;
    const findFirstObscuredChildIndex = [...roundabout.children].findIndex(
      (child, i, children) =>
        !isWhollyInView(roundabout)(child) &&
        isWhollyInView(roundabout)(children[i + 1]),
    );

    const firstObscuredChildIndex = Math.max(findFirstObscuredChildIndex, 0);

    const findLastObscuredChildIndex = [...roundabout.children].findIndex(
      (child, i, children) =>
        !isWhollyInView(roundabout)(child) &&
        isWhollyInView(roundabout)(children[i - 1]),
    );

    const lastObscuredChildIndex =
      Math.max(findLastObscuredChildIndex, 0) || roundabout.children.length - 1;

    return [firstObscuredChildIndex, lastObscuredChildIndex];
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
      snapPositionOffset,
    } = this.props;
    const { children, scrollLeft } = this.roundabout;
    const slideIndex = normalizeIndex(index, this.childCount, infinite);
    const startingIndex = this.state.activeIndex;
    const delta =
      children[slideIndex].offsetLeft - scrollLeft - snapPositionOffset;
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
        if (startingIndex !== slideIndex) {
          return afterSlide(slideIndex);
        }
      })
      .catch((_) => {
        this.setState({ isAnimating: false });
      });
  };

  next = () => {
    const { childCount, props } = this;
    const { infinite } = props;

    const [_, nextSlide] = this.getPartiallyObscuredSlides();
    const nextInfinteSlide = nextSlide === childCount - 1 ? 0 : nextSlide;
    return this.slideTo(infinite ? nextInfinteSlide : nextSlide);
  };

  prev = () => {
    const { childCount, state, props } = this;
    const { activeIndex } = state;
    const { infinite } = props;
    const firstIndex = 0;

    const prevSlide = Math.max(activeIndex - 1, firstIndex);
    const prevInfinteSlide =
      prevSlide === activeIndex ? childCount - 1 : prevSlide;
    return this.slideTo(infinite ? prevInfinteSlide : prevSlide);
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
      preventAutoCorrect,
      snapToSlide,
      snapPositionOffset,
      onVehicleClick,
      vehicleClass,
      slideTo,
      startAt,
      style,
      ...props
    } = this.props;

    const styles = {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'all .25s ease-in-quint',
      outline: 'none',
    };

    return (
      <div>
        <Arrow icon={<ChevronLeftSmall />} onClick={this.prev} />
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
        <Arrow icon={<ChevronRightSmall />} onClick={this.next} />
      </div>
    );
  }
}

export default Roundabout;
