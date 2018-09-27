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

  it('uses render prop correctly', () => {
    const tree = renderer.create(
      <InfiniteScroll
        isLoading={true}
        throttle={100}
        threshold={300}
        hasMore={true}
        onLoadMore={() => {}}
        render={({ sentinel, children }) => (
          <table>
            <tr>
              <th>Hello</th>
              {children}
            </tr>
            <tr>
              <td>{sentinel}</td>
            </tr>
          </table>
        )}
      >
        <th>World</th>
      </InfiniteScroll>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses component prop correctly', () => {
    function SomeComponent({ sentinel, children }) {
      return (
        <table>
          <tr>
            <th>Hello</th>
            {children}
          </tr>
          <tr>
            <td>{sentinel}</td>
          </tr>
        </table>
      );
    }

    const tree = renderer.create(
      <InfiniteScroll
        isLoading={true}
        throttle={100}
        threshold={300}
        hasMore={true}
        onLoadMore={() => {}}
        component={SomeComponent}
      >
        <th>World</th>
      </InfiniteScroll>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
