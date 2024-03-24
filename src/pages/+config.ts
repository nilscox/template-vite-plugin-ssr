import type { Config } from 'vike/types';
import vikeSolid from 'vike-solid/config';

import Head from '../layouts/head';
import Layout from '../layouts/layout';

export default {
  Layout,
  Head,
  title: '',
  extends: vikeSolid,
} satisfies Config;
