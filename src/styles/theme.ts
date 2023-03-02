
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    fonts:{
        body:'Roboto',
        headings:'Roboto',
    },
    colors: {
        gray: {
            "900":  "#181B23", 
            "800":  "#1F2029", 
            "700":  "#353646", 
            "600":  "#4B4D63", 
            "500":  "#616480", 
            "400":  "#797D9A", 
            "300":  "#9699B0", 
            "200":  "#B3B5C6", 
            "100":  "#D1D2DC", 
            "50":   "#EEEEF2",
        },
        red:{
            "dark-3": "#180000",
            "dark-2": "#A60321",
            "dark-1": "#590209",
            "standard": "#D9043D",
            "light-1": "#F2055C",
        }
    },
    styles: {
        global: {
            body: {
                bg: 'red.dark-3',
                color: 'gray.50'
            }
        }
    }
})