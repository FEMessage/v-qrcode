import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

storiesOf('v-qrcode', module)
  .add('basic usage', () => ({
    template: '<v-qrcode value="https://github.com/FEMessage/el-data-table"></v-qrcode>'
  }));
