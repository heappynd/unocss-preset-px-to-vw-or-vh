import { describe, expect, it } from 'vitest'
import { presetPxToViewport } from '../src'

describe('presetPxToViewport', () => {
  it('should convert px to vw based on the design width', () => {
    const preset = presetPxToViewport({ designWidth: 1920 })
    const mockUtil = {
      entries: [
        ['width', '16px'],
        ['padding-left', '32px'],
        ['margin-right', '64px'],
      ],
    }

    preset.postprocess(mockUtil)

    expect(mockUtil.entries).toEqual([
      ['width', '0.8333333333333334vw'],
      ['padding-left', '1.6666666666666667vw'],
      ['margin-right', '3.3333333333333335vw'],
    ])
  })

  it('should convert px to vh based on the design height', () => {
    const preset = presetPxToViewport({ designHeight: 1080 })
    const mockUtil = {
      entries: [
        ['height', '108px'],
        ['padding-top', '54px'],
        ['margin-bottom', '27px'],
      ],
    }

    preset.postprocess(mockUtil)

    expect(mockUtil.entries).toEqual([
      ['height', '10vh'],
      ['padding-top', '5vh'],
      ['margin-bottom', '2.5vh'],
    ])
  })

  it('should handle both vw and vh conversions for applicable keys', () => {
    const preset = presetPxToViewport({
      designWidth: 1920,
      designHeight: 1080,
    })
    const mockUtil = {
      entries: [
        ['padding', '16px'],
        ['margin', '32px'],
        ['gap', '8px'],
      ],
    }

    preset.postprocess(mockUtil)

    expect(mockUtil.entries).toEqual([
      ['padding', '1.4814814814814814vh 0.8333333333333334vw'],
      ['margin', '2.962962962962963vh 1.6666666666666667vw'],
      ['gap', '0.7407407407407407vh 0.4166666666666667vw'],
    ])
  })

  it('should append custom keys when replaceKey is false', () => {
    const preset = presetPxToViewport({
      keyToVw: ['custom-width'],
      keyToVh: ['custom-height'],
      replaceKey: false,
    })

    const mockUtil = {
      entries: [
        ['custom-width', '50px'],
        ['custom-height', '25px'],
        ['width', '100px'],
      ],
    }

    preset.postprocess(mockUtil)

    expect(mockUtil.entries).toEqual([
      ['custom-width', '2.6041666666666665vw'],
      ['custom-height', '2.314814814814815vh'],
      ['width', '5.208333333333333vw'],
    ])
  })

  it('should replace default keys when replaceKey is true', () => {
    const preset = presetPxToViewport({
      keyToVw: ['custom-width'],
      keyToVh: ['custom-height'],
      replaceKey: true,
    })

    const mockUtil = {
      entries: [
        ['custom-width', '50px'],
        ['custom-height', '25px'],
        ['width', '100px'],
      ],
    }

    preset.postprocess(mockUtil)

    expect(mockUtil.entries).toEqual([
      ['custom-width', '2.6041666666666665vw'],
      ['custom-height', '2.314814814814815vh'],
      ['width', '100px'],
    ])
  })
})
