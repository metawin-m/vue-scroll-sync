import { configure } from '@storybook/vue';

import Vue from 'vue';

// Import your custom components.
import ScrollSync from '../src/ScrollSync.vue';
// import ScrollSync from '../dist/scroll-sync'

// Register custom components.
Vue.component('scroll-sync', ScrollSync);

function loadStories() {
  // You can require as many stories as you need.
  require('../stories');
}

configure(loadStories, module);
