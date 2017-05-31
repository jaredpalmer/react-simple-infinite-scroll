import * as React from 'react';

const throttle = require('lodash.throttle');

export interface InfiniteListProps {
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

export class InfiniteList extends React.Component<InfiniteListProps, {}> {
  public static defaultProps: Pick<InfiniteListProps, 'threshold' | 'throttle'> = {
    threshold: 100,
    throttle: 64,
  };
  private sentinel: HTMLDivElement;

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.checkWindowScroll, this.props.throttle));
    window.removeEventListener('resize', throttle(this.checkWindowScroll, this.props.throttle));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.checkWindowScroll, this.props.throttle));
    window.removeEventListener('resize', throttle(this.checkWindowScroll, this.props.throttle));
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

export default React.createFactory(InfiniteList);