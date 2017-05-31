# React Simple Infinite List

A brutally simple infinite scroll helper component.

## Install

```bash
npm install react-simple-infinite-list --save
```

## Usage

```js
import React from 'react'
import InfiniteList from 'react-simple-infinite-list'

export class MyInfiniteListExample extends React.Component {
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
        <InfiniteList
          throttle={100}
          threshold={300}
          isLoading={this.state.isLoading}
          hasMore={!!this.state.cursor}
          onLoadMore={this.loadMore}
        >
          {this.state.items.length > 0 
            ? this.state.items.map(item => (
                <MyListItem key={item.id} title={item.title} />
              ))
            : null}
        </InfiniteList>
        {this.state.isLoading && (
          <MyLoadingState />
        )}
      </div>
    )
  }
}
```

#### Author
- Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)