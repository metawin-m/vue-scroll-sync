# vue-scroll-sync

A Vue component that synchronizes the scroll positions of containers

## Installation

```js
npm i --save vue-scroll-sync
```

### Browser

Include the script file, then install the component with `Vue.use(ScrollSync);` e.g.:

```html
<script type="text/javascript" src="node_modules/vue/dist/vue.min.js"></script>
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

Scrolling one container scrolls the others in the same `group`:

```html
<scroll-sync vertical proportional group="editor">
    Content
</scroll-sync>
<scroll-sync vertical proportional group="editor">
    Longer content
</scroll-sync>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `vertical` | Boolean | `false` | Sync the vertical scroll position |
| `horizontal` | Boolean | `false` | Sync the horizontal scroll position |
| `proportional` | Boolean | `false` | Scroll by the same percentage instead of the same number of pixels, for content of different sizes |
| `group` | String | none | Only sync with containers in the same group |

[Demo and Code Example](https://metawin-m.github.io/vue-scroll-sync)

## SSR

Create the `plugins/vue-scroll-sync.js` :

```javascript
import Vue from 'vue'
import ScrollSync from 'vue-scroll-sync'

Vue.component('scroll-sync', ScrollSync)
```

Include plugin in your `nuxt.config.js` file:

```javascript
module.exports = {
  plugins: ['~plugins/vue-scroll-sync']
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [react-scroll-sync](https://github.com/okonet/react-scroll-sync) for the scrolling position calculation and the method to prevent the event echo
