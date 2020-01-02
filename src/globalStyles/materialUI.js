import { createMuiTheme } from '@material-ui/core/styles';

export function globalMaterialUI(themePalette) {
    const globalMaterialUIComponents = createMuiTheme({
        overrides: {
            MuiCardHeader: {
                title: {
                    fontSize:'26px'
                }
            },
            MuiAvatar: {
                root: {
                    width: '60px',
                    height: '60px',
                }
            },
            MuiContainer: {
                root: {
                    background: themePalette === 'dark' ? '#c51162' : 'pink',
                    minHeight: '100vh'
                }
            },
            MuiFab: {
                root: {
                    disableRipple:true,
                    backgroundColor: themePalette === 'dark' ? 'pink' : '#c51162',
                    color: themePalette === 'dark' ? '#c51162' : 'white',
                    '&:hover': {
                        backgroundColor: themePalette === 'dark' ? 'pink' : '#c51162',
                        color: themePalette === 'dark' ? '#c51162' : 'white',
                        boxShadow: 'none',
                    },
                    
                }
            },
        },
        palette: {
            type: themePalette
        }
    });
    return globalMaterialUIComponents

}
