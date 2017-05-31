import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { InfiniteList } from '../.';

describe('<InfiniteList />', () => {

  it('renders InfiniteList correctly', () => {
    const tree = renderer.create(
      <InfiniteList
        isLoading={true}
        throttle={100}
        threshold={300}
        hasMore={true}
        onLoadMore={() => console.log()}
      >
        <div>Hello</div>
      </InfiniteList>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
