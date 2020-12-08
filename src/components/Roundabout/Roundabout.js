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

const TRANSITION_SPEED = 600;

class Roundabout extends React.Component {
  static defaultProps = {
    afterSlide: nop,
    beforeSlide: nop,
    animationDuration: TRANSITION_SPEED,
    gutter: 0,
    onVehicleClick: nop,
    startOffset: 0,
    startAt: 0,
    style: {},
    buttonSkin: 'standard',
  };

  state = {
    activeIndex: this.props.startAt,
    isAnimating: false,
  };

  componentDidMount() {
    this.childCount = this.roundabout?.children?.length || 0;
    this.slideTo(this.props.startAt, { immediate: true }).catch(nop);
  }

  componentDidUpdate(prevProps) {
    this.childCount = this.roundabout?.children?.length || 0;
    if (prevProps.slideTo !== this.props.slideTo) {
      this.slideTo(this.props.slideTo).catch(nop);
    }
  }

  shouldComponentUpdate(nextProps, { isAnimating }) {
    const propValues = [...values(this.props), this.state.isAnimating];
    const nextPropValues = [...values(nextProps), isAnimating];
    return !nextPropValues.every((val, i) => val === propValues[i]);
  }

  getPartiallyObscuredVehicles = () => {
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

    const [_, nextVehicle] = this.getPartiallyObscuredVehicles();
    const nextInfiniteVehicle =
      nextVehicle === childCount - 1 ? 0 : nextVehicle;
    return this.slideTo(infinite ? nextInfiniteVehicle : nextVehicle);
  };

  prev = () => {
    const { childCount, state, props } = this;
    const { activeIndex } = state;
    const { infinite } = props;

    const [prevVehicle, _] = this.getPartiallyObscuredVehicles();
    const prevInfiniteVehicle =
      prevVehicle === activeIndex ? childCount - 1 : prevVehicle;
    return this.slideTo(infinite ? prevInfiniteVehicle : prevVehicle);
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
        <Arrow
          icon={<ChevronLeftSmall />}
          onClick={this.prev}
          buttonSkin={buttonSkin}
        />
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
        <Arrow
          icon={<ChevronRightSmall />}
          onClick={this.next}
          buttonSkin={buttonSkin}
        />
      </div>
    );
  }
}

export default Roundabout;
