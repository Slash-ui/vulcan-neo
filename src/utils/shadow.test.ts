import { describe, it, expect } from 'vitest';
import {
  adjustBrightness,
  getLightShadow,
  getDarkShadow,
  getNeomorphicShadow,
  createNeomorphicStyles,
  getCSSVar,
} from './shadow';

// =============================================================================
// adjustBrightness
// =============================================================================

describe('adjustBrightness', () => {
  it('increases brightness with positive percent', () => {
    const result = adjustBrightness('#808080', 20);
    // 128 + 51 = 179 = 0xB3
    expect(result).toBe('#b3b3b3');
  });

  it('decreases brightness with negative percent', () => {
    const result = adjustBrightness('#808080', -20);
    // 128 - 51 = 77 = 0x4D
    expect(result).toBe('#4d4d4d');
  });

  it('handles maximum brightness (white)', () => {
    const result = adjustBrightness('#FFFFFF', 50);
    // Should stay at 255
    expect(result).toBe('#ffffff');
  });

  it('handles minimum brightness (black)', () => {
    const result = adjustBrightness('#000000', -50);
    // Should stay at 0
    expect(result).toBe('#000000');
  });

  it('clamps to 255 when adjustment exceeds max', () => {
    const result = adjustBrightness('#F0F0F0', 50);
    // 240 + 127.5 = 367.5, clamped to 255
    expect(result).toBe('#ffffff');
  });

  it('clamps to 0 when adjustment goes below min', () => {
    const result = adjustBrightness('#101010', -50);
    // 16 - 127.5 = -111.5, clamped to 0
    expect(result).toBe('#000000');
  });

  it('handles hex without hash', () => {
    const result = adjustBrightness('808080', 20);
    expect(result).toBe('#b3b3b3');
  });

  it('handles different RGB values independently', () => {
    const result = adjustBrightness('#FF0000', 10);
    // R: 255 + 26 = 281, clamped to 255
    // G: 0 + 26 = 26 = 0x1a
    // B: 0 + 26 = 26 = 0x1a
    expect(result).toBe('#ff1a1a');
  });

  it('returns same color for 0 percent adjustment', () => {
    const result = adjustBrightness('#808080', 0);
    expect(result).toBe('#808080');
  });

  it('handles lowercase hex', () => {
    const result = adjustBrightness('#abcdef', 0);
    expect(result).toBe('#abcdef');
  });
});

// =============================================================================
// getLightShadow
// =============================================================================

describe('getLightShadow', () => {
  it('returns lighter color than input', () => {
    const bgColor = '#808080';
    const result = getLightShadow(bgColor);
    // With default intensity 0.8, adjustment = 15 * 0.8 = 12
    // 128 + 30.6 = ~158.6
    const inputValue = parseInt('80', 16); // 128
    const resultValue = parseInt(result.replace('#', '').slice(0, 2), 16);
    expect(resultValue).toBeGreaterThan(inputValue);
  });

  it('uses default intensity of 0.8', () => {
    const result1 = getLightShadow('#808080');
    const result2 = getLightShadow('#808080', 0.8);
    expect(result1).toBe(result2);
  });

  it('respects custom intensity', () => {
    const lowIntensity = getLightShadow('#808080', 0.2);
    const highIntensity = getLightShadow('#808080', 1.0);

    const lowValue = parseInt(lowIntensity.replace('#', '').slice(0, 2), 16);
    const highValue = parseInt(highIntensity.replace('#', '').slice(0, 2), 16);

    expect(highValue).toBeGreaterThan(lowValue);
  });

  it('handles white background', () => {
    const result = getLightShadow('#FFFFFF');
    // Should stay white (clamped)
    expect(result).toBe('#ffffff');
  });

  it('handles zero intensity', () => {
    const result = getLightShadow('#808080', 0);
    // No adjustment
    expect(result).toBe('#808080');
  });
});

// =============================================================================
// getDarkShadow
// =============================================================================

describe('getDarkShadow', () => {
  it('returns darker color than input', () => {
    const bgColor = '#808080';
    const result = getDarkShadow(bgColor);
    const inputValue = parseInt('80', 16); // 128
    const resultValue = parseInt(result.replace('#', '').slice(0, 2), 16);
    expect(resultValue).toBeLessThan(inputValue);
  });

  it('uses default intensity of 0.6', () => {
    const result1 = getDarkShadow('#808080');
    const result2 = getDarkShadow('#808080', 0.6);
    expect(result1).toBe(result2);
  });

  it('respects custom intensity', () => {
    const lowIntensity = getDarkShadow('#808080', 0.2);
    const highIntensity = getDarkShadow('#808080', 1.0);

    const lowValue = parseInt(lowIntensity.replace('#', '').slice(0, 2), 16);
    const highValue = parseInt(highIntensity.replace('#', '').slice(0, 2), 16);

    // Lower intensity means less darkening, so higher value
    expect(lowValue).toBeGreaterThan(highValue);
  });

  it('handles black background', () => {
    const result = getDarkShadow('#000000');
    // Should stay black (clamped)
    expect(result).toBe('#000000');
  });

  it('handles zero intensity', () => {
    const result = getDarkShadow('#808080', 0);
    // No adjustment
    expect(result).toBe('#808080');
  });
});

// =============================================================================
// getNeomorphicShadow
// =============================================================================

describe('getNeomorphicShadow', () => {
  describe('convex depth', () => {
    it('returns outer shadows for convex depth', () => {
      const result = getNeomorphicShadow({ elevation: 'mid', depth: 'convex' });
      expect(result).toContain('-8px -8px 16px var(--neo-shadow-light)');
      expect(result).toContain('8px 8px 16px var(--neo-shadow-dark)');
      expect(result).not.toContain('inset');
    });

    it('uses correct distance for low elevation', () => {
      const result = getNeomorphicShadow({ elevation: 'low', depth: 'convex' });
      expect(result).toContain('-4px -4px 8px');
      expect(result).toContain('4px 4px 8px');
    });

    it('uses correct distance for high elevation', () => {
      const result = getNeomorphicShadow({ elevation: 'high', depth: 'convex' });
      expect(result).toContain('-16px -16px 32px');
      expect(result).toContain('16px 16px 32px');
    });
  });

  describe('concave depth', () => {
    it('returns inset shadows for concave depth', () => {
      const result = getNeomorphicShadow({ elevation: 'mid', depth: 'concave' });
      expect(result).toContain('inset 8px 8px 16px var(--neo-shadow-dark)');
      expect(result).toContain('inset -8px -8px 16px var(--neo-shadow-light)');
    });

    it('uses correct distance for low elevation', () => {
      const result = getNeomorphicShadow({ elevation: 'low', depth: 'concave' });
      expect(result).toContain('inset 4px 4px 8px');
      expect(result).toContain('inset -4px -4px 8px');
    });

    it('uses correct distance for high elevation', () => {
      const result = getNeomorphicShadow({ elevation: 'high', depth: 'concave' });
      expect(result).toContain('inset 16px 16px 32px');
      expect(result).toContain('inset -16px -16px 32px');
    });
  });

  describe('flat depth', () => {
    it('returns none for flat depth', () => {
      const result = getNeomorphicShadow({ elevation: 'mid', depth: 'flat' });
      expect(result).toBe('none');
    });

    it('returns none regardless of elevation', () => {
      expect(getNeomorphicShadow({ elevation: 'low', depth: 'flat' })).toBe('none');
      expect(getNeomorphicShadow({ elevation: 'high', depth: 'flat' })).toBe('none');
    });
  });

  describe('elevation values', () => {
    it('low elevation uses distance of 4', () => {
      const result = getNeomorphicShadow({ elevation: 'low', depth: 'convex' });
      expect(result).toContain('4px');
    });

    it('mid elevation uses distance of 8', () => {
      const result = getNeomorphicShadow({ elevation: 'mid', depth: 'convex' });
      expect(result).toContain('8px');
    });

    it('high elevation uses distance of 16', () => {
      const result = getNeomorphicShadow({ elevation: 'high', depth: 'convex' });
      expect(result).toContain('16px');
    });
  });
});

// =============================================================================
// createNeomorphicStyles
// =============================================================================

describe('createNeomorphicStyles', () => {
  it('returns object with convex, concave, and flat styles', () => {
    const result = createNeomorphicStyles('#E0E5EC');
    expect(result).toHaveProperty('convex');
    expect(result).toHaveProperty('concave');
    expect(result).toHaveProperty('flat');
  });

  it('convex style has outer shadows', () => {
    const result = createNeomorphicStyles('#E0E5EC', 'mid');
    expect(result.convex.boxShadow).toContain('-8px -8px 16px');
    expect(result.convex.boxShadow).toContain('8px 8px 16px');
    expect(result.convex.boxShadow).not.toContain('inset');
  });

  it('concave style has inset shadows', () => {
    const result = createNeomorphicStyles('#E0E5EC', 'mid');
    expect(result.concave.boxShadow).toContain('inset');
  });

  it('flat style has no shadow', () => {
    const result = createNeomorphicStyles('#E0E5EC');
    expect(result.flat.boxShadow).toBe('none');
  });

  it('uses default mid elevation', () => {
    const resultDefault = createNeomorphicStyles('#E0E5EC');
    const resultMid = createNeomorphicStyles('#E0E5EC', 'mid');
    expect(resultDefault.convex.boxShadow).toBe(resultMid.convex.boxShadow);
  });

  it('uses light and dark shadows from background color', () => {
    const result = createNeomorphicStyles('#808080', 'low');
    // Should contain lighter and darker hex colors derived from #808080
    expect(result.convex.boxShadow).toMatch(/#[a-f0-9]{6}/i);
  });

  it('respects elevation parameter', () => {
    const low = createNeomorphicStyles('#E0E5EC', 'low');
    const high = createNeomorphicStyles('#E0E5EC', 'high');

    expect(low.convex.boxShadow).toContain('4px');
    expect(high.convex.boxShadow).toContain('16px');
  });
});

// =============================================================================
// getCSSVar
// =============================================================================

describe('getCSSVar', () => {
  it('returns CSS variable reference', () => {
    const result = getCSSVar('bg');
    expect(result).toBe('var(--neo-bg)');
  });

  it('handles multi-word names', () => {
    const result = getCSSVar('shadow-light');
    expect(result).toBe('var(--neo-shadow-light)');
  });

  it('handles single character names', () => {
    const result = getCSSVar('x');
    expect(result).toBe('var(--neo-x)');
  });

  it('preserves exact name formatting', () => {
    const result = getCSSVar('TEXT_PRIMARY');
    expect(result).toBe('var(--neo-TEXT_PRIMARY)');
  });

  it('handles empty string', () => {
    const result = getCSSVar('');
    expect(result).toBe('var(--neo-)');
  });
});
