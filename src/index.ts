import { definePreset } from 'unocss';

const pxRE = /(-?[.\d]+)px/g;

export interface PxToViewportOptions {
  designWidth?: number;
  designHeight?: number;
}

const px2vw = (px: number, designWidth: number) => {
  return (px * 100.0) / designWidth + 'vw';
};
const px2vh = (px: number, designHeight: number) => {
  return (px * 100.0) / designHeight + 'vh';
};

const keyToVw = [
  'width',
  'padding-left',
  'padding-right',
  'margin-left',
  'margin-right',
  'left',
  'right',
];
const keyToVh = [
  'height',
  'padding-top',
  'padding-bottom',
  'margin-top',
  'margin-bottom',
  'top',
  'bottom',
  'leading',
];

export const presetPxToViewport = definePreset(
  (options: PxToViewportOptions = {}) => {
    const { designWidth = 1920, designHeight = 1080 } = options;

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
          if (['padding', 'margin'].includes(key)) {
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
