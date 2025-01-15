import { definePreset } from 'unocss';

const pxRE = /(-?[.\d]+)px/g;

export interface PxToViewportOptions {
  designWidth?: number;
  designHeight?: number;
  keyToVw?: string[];
  keyToVh?: string[];
  keyToBoth?: string[];
  // add or replace key
  replaceKey?: boolean;
}

const px2vw = (px: number, designWidth: number) => {
  return (px * 100.0) / designWidth + 'vw';
};
const px2vh = (px: number, designHeight: number) => {
  return (px * 100.0) / designHeight + 'vh';
};

const defaultKeyToVw = [
  'width',
  'padding-left',
  'padding-right',
  'margin-left',
  'margin-right',
  'left',
  'right',
  'column-gap',
];
const defaultKeyToVh = [
  'height',
  'padding-top',
  'padding-bottom',
  'margin-top',
  'margin-bottom',
  'top',
  'bottom',
  'leading',
  'row-gap',
];
const defaultKeyToBoth = ['padding', 'margin', 'gap'];

export const presetPxToViewport = definePreset(
  (options: PxToViewportOptions = {}) => {
    const { designWidth = 1920, designHeight = 1080 } = options;

    let keyToVw = [];
    let keyToVh = [];
    let keyToBoth = [];

    const replaceKey = options.replaceKey || false;

    if (replaceKey) {
      keyToVw = options.keyToVw || defaultKeyToVw;
      keyToVh = options.keyToVh || defaultKeyToVh;
      keyToBoth = options.keyToBoth || defaultKeyToBoth;
    } else {
      keyToVw = [...defaultKeyToVw, ...(options.keyToVw || [])];
      keyToVh = [...defaultKeyToVh, ...(options.keyToVh || [])];
      keyToBoth = [...defaultKeyToBoth, ...(options.keyToBoth || [])];
    }

    return {
      name: 'unocss-preset-px-to-viewport',
      postprocess: (util) => {
        // console.log(util);

        util.entries.forEach((i) => {
          const key = i[0];
          const value = i[1];
          if (typeof value !== 'string') return;
          if (keyToVw.includes(key)) {
            i[1] = value.replace(
              pxRE,
              (_, p1) => `${px2vw(Number(p1), designWidth)}`,
            );
          }
          if (keyToVh.includes(key)) {
            i[1] = value.replace(
              pxRE,
              (_, p1) => `${px2vh(Number(p1), designHeight)}`,
            );
          }
          if (keyToBoth.includes(key)) {
            i[1] = value.replace(
              pxRE,
              (_, p1) =>
                `${px2vh(Number(p1), designHeight)} ${px2vw(
                  Number(p1),
                  designWidth,
                )}`,
            );
          }
        });
      },
    };
  },
);
