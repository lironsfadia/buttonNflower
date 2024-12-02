export const PAGE_SIZE = 20;
export const SCREENS = {
  ICON_SIZE: 24,
  ICON_SIZE_LARGE: 32,
  SCREEN_NAMES: {
    FLOWERING_REPORTS: 'Movies',
    WATCHLIST: 'Watchlist',
  },
  HEADER_PADDING: {
    IOS: 20,
    ANDROID: 16,
  },
  COLORS: {
    SUCCESS: '#22c55e',
    ERROR: '#ef4444',
    SEPARATOR: '#e2e8f0',
    BACKGROUND: '#f8fafc',
    WHITE: '#fff',
    GREEN: '#10b981',
    RED: '#ef4444',
    DATE: '#64748b',
    DETAILS: '#475569',
  },
  STYLES: {
    BORDER_RADIUS: 12,
    SEPARATOR_HEIGHT: 2,
    MARGIN_VERTICAL: 8,
    MARGIN_BOTTOM: 20,
    PADDING: 16,
    GAP: 12,
    SHADOW_OFFSET: 2,
    SHADOW_OPACITY: 0.05,
    SHADOW_RADIUS: 4,
    STATUS_BADGE: {
      PADDING_H: 12,
      PADDING_V: 6,
      BORDER_RADIUS: 16,
      FONT_SIZE: 12,
    },
    TEXT: {
      TITLE: 32,
      SUBTITLE: 18,
      DATE: 14,
      DETAILS: 14,
      LINE_HEIGHT: 20,
    },
  },
  LIST: {
    THRESHOLD: 0.5,
    ITEM_HEIGHT: 100,
    ITEM_WIDTH: 100,
  },
  FAVORITES: {
    ICON_COLORS: {
      FILLED: '#ef4444',
      UNFILLED: '#9ca3af',
    },
  },
} as const;
