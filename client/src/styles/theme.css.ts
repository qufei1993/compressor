import { createTheme, createThemeContract } from '@vanilla-extract/css';

const colors = createThemeContract({
  color: null,
  background: null,
  header: {
    color: null,
    backgroundColor: null,
    border: null,
  },
  footer: {
    backgroundColor: null,
  },
  compress: {
    container: {
      backgroundColor: null,
      backgroundImage: null,
    },
  },
  advanceSetting: {
    form: {
      text: {
        backgroundColor: null,
      },
      bottomBox: {
        borderTopCorlor: null,
        backgroundColor: null,
      },
    },
  },
});

export const lightTheme = createTheme(colors, {
  color: '#000000d9',
  background: '#ffffff',
  header: {
    color: 'rgba(0, 0, 0, 0.85)',
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
  },
  footer: {
    backgroundColor: '#001529',
  },
  compress: {
    // rgba(89,182,155,0.3)
    container: {
      backgroundColor: '#fdfdfd',
      backgroundImage:
        // 'linear-gradient(to top,rgba(253,253,253,0.3) 0%,rgba(89,182,155,0.2) 100%)',
        'linear-gradient(to top,rgba(253,253,253,0.3) 0%,rgba(193,218,255,0.3) 100%)',
    },
  },
  advanceSetting: {
    form: {
      text: {
        backgroundColor: '#f5f5f5',
      },
      bottomBox: {
        borderTopCorlor: '#f0f0f0',
        backgroundColor: '#ffffff',
      },
    },
  },
});

export const darkTheme = createTheme(colors, {
  color: '#fffffff',
  background: '#000000',
  header: {
    color: '#141414',
    backgroundColor: '#141414',
    border: '1px solid #303030',
  },
  footer: {
    backgroundColor: '#000000',
  },
  compress: {
    container: {
      backgroundColor: '#000000',
      backgroundImage: '',
    },
  },
  advanceSetting: {
    form: {
      text: {
        backgroundColor: '#000000',
      },
      bottomBox: {
        borderTopCorlor: '#303030',
        backgroundColor: '#1f1f1f',
      },
    },
  },
});

export const vars = { colors };
