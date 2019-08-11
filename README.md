# React Simple Infinite Scroll

A brutally simple infinite scroll helper component.

## Install

```bash
npm install react-simple-infinite-scroll --save
```

## Usage

This component uses a "sentinel" `div` (with a React ref) that calls `getBoundingClientRect()` to measure its position and fire off a callback when it becomes visible again. Note: this package eventually becomes somewhat inefficient on very very very large lists because it keeps adding nodes to the DOM. However, this package is extremely valuable for situations when a windowing technique is not possible and when a user is going to realistically scroll a few hundred rows (and _not_ thousands of rows). 

### Why not use windowing (`react-virtualized`)?

If you can, you probably should. However, windowing only works when you know the total number of items in the result set ahead of time. This isn't always possible. For example, let's say you have a MongoDB database where you cannot efficiently return the total number of documents in a given query. All your API returns is a cursor (so you can know is if there is another page or not). While this would prevent you from using windowing/`react-virtualized`, `react-simple-infinite-scroll` will work just fine.

### The Gist

```jsx
<InfiniteScroll
  throttle={100}
  threshold={300}
  isLoading={this.state.isLoading}
  hasMore={!!this.state.cursor}
  onLoadMore={this.loadMore}
>
  {this.state.myArrayOfItems.map(item => <div>{/* ... */}</div>)}
</InfiniteScroll>
```

```jsx
<InfiniteScroll
  throttle={100}
  threshold={300}
  isLoading={this.state.isLoading}
  hasMore={!!this.state.cursor}
  onLoadMore={this.loadMore}
  render={({ sentinel }) => (
    <section>
      {this.state.myArrayOfItems.map(item => <div>{/* ... */}</div>)}
      {sentinel}
    </section>
  )}
/>
```

```jsx
// Small react-redux pseudocode
// `storeData` is information extracted from the store
const MyComponent = ({ sentinel, storeData }) => (
  <section>
    {storeData.entities}
    {sentinel}
  </section>
);

const ConnectedComponent = connect(/* ... */)(MyComponent);

<InfiniteScroll
  throttle={100}
  threshold={300}
  isLoading={storeData.isLoading}
  hasMore={storeData.hasMore}
  onLoadMore={() => boundActions.fetchMoreEntities(storeData.cursor)}
  component={ConnectedComponent}
/>
```

### Full Example

```jsx
import React from 'react'
import { InfiniteScroll } from 'react-simple-infinite-scroll'

export class MyInfiniteScrollExample extends React.Component {
  state = {
    items: [],
    isLoading: true,
    cursor: 0
  }

  componentDidMount() {
    // do some paginated fetch
    this.loadMore()
  }

  loadMore = () => {
    this.setState({ isLoading: true, error: undefined })
    fetch(`https://api.example.com/v1/items?from=${this.state.cursor}`)
      .then(res => res.json())
      .then(
        res => {
          this.setState(state => ({
            items: [...state.items, ...res.items],
            cursor: res.cursor,
            isLoading: false
          }))
        },
        error => {
          this.setState({ isLoading: false, error })
        }
    )
  }

  render() {
    return (
      <div>
        <InfiniteScroll
          throttle={100}
          threshold={300}
          isLoading={this.state.isLoading}
          hasMore={!!this.state.cursor}
          onLoadMore={this.loadMore}
        >
          {this.state.items.length > 0
            ? this.state.items.map(item => (
                <MysListItem key={item.id} title={item.title} />
              ))
            : null}
        </InfiniteScroll>
        {this.state.isLoading && (
          <MyLoadingState />
        )}
      </div>
    )
  }
}
```


## API Reference 

### Props

#### `hasMore: boolean`

**Required**

Specifies if there are more entities to load.

#### `isLoading: boolean`

**Required**

When `true`, `onLoadMore()` will not be executed on scroll.

#### `onLoadMore: () => void`

**Required**

Called when the user has scrolled all the way to the end. This happens when the `sentinel` has reached the `threshold`.

#### `threshold?: number`

Scroll threshold. Number of pixels before the `sentinel` reaches the viewport to trigger `onLoadMore()`.

#### `throttle?: number = 64`

Defaults to `64`. Scroll handler will be executed at most once per the number of milliseconds specified.

**Warning:** Making this number closer to zero can decrease performance due to a force reflow caused by `getBoundingClientRect()`, see more properties that can cause this issue in [this gist by Paul Irish](https://gist.github.com/paulirish/5d52fb081b3570c81e3a).

#### `render?: (props: ScrollProps) => React.ReactNode`

Callback used for convenient inline rendering and wrapping. Arguments passed `Object: { sentinel, children }`. Use this if you have a more complex layout where the `sentinel` needs to be injected.

**Warning:** The `sentinel` must be rendered (injected into the DOM) in order for this library to work properly, failing to do so will result in errors and unexpected side effects.

#### `component?: React.ComponentType<ScrollProps>`

React component. Similar to the `render()` prop, this component will receive `Object: { sentinel, children }` as props. **Note** that `render()` prop has precedence over this property, meaning that if both are present, `component` will not be rendered.

**Warning:** The `sentinel` must be rendered (injected into the DOM) in order for this library to work properly, failing to do so will result in errors and unexpected side effects.

## Alternatives

- [`brigade/react-waypoint`](https://github.com/brigade/react-waypoint)

## Author

* Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

## Contributors

<!-- Contributors START
jared_palmer jaredpalmer https://twitter.com/jaredpalmer/ author contributor
pablo_garcia pgarciacamou https://twitter.com/pgarciacamou/ contributor
Contributors END -->
<!-- Contributors table START -->
| <img src="https://avatars.githubusercontent.com/jaredpalmer?s=100" width="100" alt="jared palmer" /><br />[<sub>jared palmer</sub>](https://twitter.com/jaredpalmer/)<br />💻 📖 💡 | <img src="https://avatars.githubusercontent.com/pgarciacamou?s=100" width="100" alt="pablo garcia" /><br />[<sub>pablo garcia</sub>](https://twitter.com/pgarciacamou/)<br />💻 📖 💡 |
| :---: | :---: |
<!-- Contributors table END -->
This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
