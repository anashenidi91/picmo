export const preview = {
  preview: {
    alignItems: 'center',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'row',
    height: 'var(--emoji-preview-size)',
    padding: '0.5em',
    position: 'relative',

    '&::after': {
      width: '100%',
      height: 16,
      content: '""',
      position: 'absolute',
      left: 0,
      top: -17,
      backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%)'
    }
  },

  previewEmoji: {
    fontSize: 'var(--emoji-preview-size)',
    marginRight: '0.25em',
    fontFamily: 'var(--emoji-font)'
  },

  previewName: {
    color: 'var(--text-color)',
    fontSize: '0.85em',
    overflowWrap: 'break-word',
    wordBreak: 'break-all'
  }
};

export type PreviewKeys = keyof typeof preview;
