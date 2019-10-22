import * as React from 'react';

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

  /**
   * Callback for convenient inline rendering and wrapping
   */
  render?: (a: object) => any;

  /**
   * A React component to act as wrapper
   */
  component?: any;
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, {}> {
  public static defaultProps: Pick<InfiniteScrollProps, 'threshold' | 'throttle'> = {
    threshold: 100,
    throttle: 64,
  };
  private sentinel: HTMLDivElement;
  private observer: IntersectionObserver;

  componentDidMount() {
    this.observer = new IntersectionObserver(this.loadMore, {rootMargin: `${this.props.threshold}px`, threshold: 0});
    window.addEventListener('scroll', this.startObservingSentinel, {once: true});
    window.addEventListener('resize', this.startObservingSentinel, {once: true});
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  startObservingSentinel = () => {
    this.observer.observe(this.sentinel);

    window.removeEventListener('scroll', this.startObservingSentinel);
    window.removeEventListener('resize', this.startObservingSentinel);
  }

  loadMore = (entries: IntersectionObserverEntry[]) => {
    const onlyEntryWeAreWatching = entries[0];

    if (!this.props.hasMore) {
      return;
    }

    if (this.props.isLoading) {
      return;
    }

    if (!onlyEntryWeAreWatching.isIntersecting) {
      return;
    }

    this.props.onLoadMore();
  }

  render() {
    const sentinel = <div ref={i => this.sentinel = i} />;

    if (this.props.render) {
      return this.props.render({
        sentinel,
        children: this.props.children
      });
    }

    if (this.props.component) {
      const Container = this.props.component;
      return (
        <Container sentinel={sentinel}>
          {this.props.children}
        </Container>
      );
    }

    return (
      <div>
        {this.props.children}
        {sentinel}
      </div>
    );
  }
}

export default React.createFactory(InfiniteScroll);
