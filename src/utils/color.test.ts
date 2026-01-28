import { describe, it, expect } from 'vitest';
import { getContrastColor, hexToRgb, getLuminance, isLightColor } from './color';

describe('color utilities', () => {
  describe('getContrastColor', () => {
    it('returns dark color for light backgrounds', () => {
      expect(getContrastColor('#FFFFFF')).toBe('#2D3436');
      expect(getContrastColor('#FFEAA7')).toBe('#2D3436');
      expect(getContrastColor('#FFF')).toBe('#2D3436');
    });

    it('returns white for dark backgrounds', () => {
      expect(getContrastColor('#000000')).toBe('#FFFFFF');
      expect(getContrastColor('#2C3E50')).toBe('#FFFFFF');
      expect(getContrastColor('#000')).toBe('#FFFFFF');
    });

    it('handles mid-range colors correctly', () => {
      expect(getContrastColor('#808080')).toBe('#2D3436');
      expect(getContrastColor('#666666')).toBe('#FFFFFF');
    });

    it('handles shorthand hex colors', () => {
      expect(getContrastColor('#FFF')).toBe('#2D3436');
      expect(getContrastColor('#000')).toBe('#FFFFFF');
      expect(getContrastColor('#F53')).toBe('#2D3436');
    });
  });

  describe('hexToRgb', () => {
    it('parses full hex colors', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('parses shorthand hex colors', () => {
      expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#0F0')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#00F')).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('handles colors without hash', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });
  });

  describe('getLuminance', () => {
    it('returns 1 for white', () => {
      expect(getLuminance('#FFFFFF')).toBe(1);
    });

    it('returns 0 for black', () => {
      expect(getLuminance('#000000')).toBe(0);
    });

    it('returns values between 0 and 1 for other colors', () => {
      const luminance = getLuminance('#808080');
      expect(luminance).toBeGreaterThan(0);
      expect(luminance).toBeLessThan(1);
    });
  });

  describe('isLightColor', () => {
    it('returns true for light colors', () => {
      expect(isLightColor('#FFFFFF')).toBe(true);
      expect(isLightColor('#FFEAA7')).toBe(true);
    });

    it('returns false for dark colors', () => {
      expect(isLightColor('#000000')).toBe(false);
      expect(isLightColor('#2C3E50')).toBe(false);
    });
  });
});
