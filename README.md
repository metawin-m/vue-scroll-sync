# vue-scroll-sync

A Vue component that syncronize containers scroll positions

## Installation

```js
npm i --save vue-scroll-sync
```

### Browser

Include the script file, then install the component with `Vue.use(ScrollSync);` e.g.:

```html
<script type="text/javascript" src="node_modules/vuejs/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-scroll-sync/dist/scroll-sync.min.js"></script>
<script type="text/javascript">
  Vue.use(ScrollSync);
</script>
```

### Module

```js
import ScrollSync from 'vue-scroll-sync';
```

## Usage

Once installed, it can be used in a template as simply as:

```html
<scroll-sync>
    Content
</scroll-sync>
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [react-scroll-sync](https://github.com/okonet/react-scroll-sync) for the scrolling position calculation and the method to prevent the event echo
