import * as React from 'react';

const throttle = require('lodash.throttle');

export interface InfiniteScrollProps {
  /**
   * Does the resource have more entities
   */
  hasMore: boolean;

  /**
   * Should show loading
   */
  isLoading: boolean;

  /**
   * Callback to load more entities
   */
  onLoadMore: () => void;

  /**
   * Scroll threshold
   */
  threshold?: number;

  /**
   * Throttle rate
   */
  throttle?: number;

  /** Children */
  children?: any;
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, {}> {
  public static defaultProps: Pick<InfiniteScrollProps, 'threshold' | 'throttle'> = {
    threshold: 100,
    throttle: 64,
  };
  private sentinel: HTMLDivElement;

  componentDidMount() {
    this.scrollHandler = throttle(this.checkWindowScroll, this.props.throttle);
    this.resizeHandler = throttle(this.checkWindowScroll, this.props.throttle);

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  checkWindowScroll = () => {
    if (this.props.isLoading) {
      return;
    }

    if (
      this.props.hasMore &&
      this.sentinel.getBoundingClientRect().top - window.innerHeight <
      this.props.threshold!
    ) {
      this.props.onLoadMore();
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
        <div ref={i => this.sentinel = i} />
      </div>
    );
  }
}

export default React.createFactory(InfiniteScroll);