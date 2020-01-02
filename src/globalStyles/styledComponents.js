import { createGlobalStyle } from 'styled-components';


export function globalStyledComponent(themePalette) {
    const globalCss = createGlobalStyle`
    *{
        padding:0;
        margin:0;
    }
    html{
        max-width:100vw;
    }
    a {
    color:${themePalette === 'dark' ? 'white' : '#000'};
    background-color:${themePalette === 'dark' ?
            'theme.palette.background.default' : 'theme.palette.background.default'};
    text-decoration: none;
    }
    a:visited {
        color: ${themePalette === 'dark' ? '#999' : '#666'};
      }
      span{
            fontWeight: bold;
            marginBottom: 5px;
      }
    `;
    return globalCss;

}
