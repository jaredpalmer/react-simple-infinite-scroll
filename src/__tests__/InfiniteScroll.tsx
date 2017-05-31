import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { InfiniteScroll } from '../.';

describe('<InfiniteScroll />', () => {

  it('renders InfiniteScroll correctly', () => {
    const tree = renderer.create(
      <InfiniteScroll
        isLoading={true}
        throttle={100}
        threshold={300}
        hasMore={true}
        onLoadMore={() => console.log()}
      >
        <div>Hello</div>
      </InfiniteScroll>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
