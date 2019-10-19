import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  props: {
    MuiButton: {
      size: 'small',
    }
  },
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    danger: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
    },
    background: {
      default: '#eee'
    }
  },
  typography: {
    useNextVariants: true,
  },
  shape: {
    borderRadius: 4
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontSize: "14px",
        color: "#aaa"
      }
    },
    MuiInput:{
      formControl:{
        '&:before': {
          borderColor: "#D2D2D2 !important"
        }
      }
    },
    MuiPaper: {
      root: {
        //padding: "24px 32px"
      },
      elevation2: {
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)"
      },
      elevation4: {
        boxShadow: "0 0px 4px 2px rgba(0, 0, 0, 0.14)"
      },
      rounded: {
        borderRadius: 6
      }
    }
  },
  drawerWidth: 260
});
window.theme = theme

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
