import {CSSProperties} from "react";
import color from "../constants/color.ts";
export const styles: { [key: string]: CSSProperties } = {
    titleContainer: {
        height: '6rem',
        marginLeft: '10px',
    },
    filterContainer: {
        height:'3rem',
        marginBottom:'0px',
    },
    questionContainer: {
        borderBlockColor: color.dgrayblue,
        marginRight:'6rem',
        marginLeft: '10px'
    },
    TabContainer: {
        borderBlockColor: color.dgrayblue,
        color:color.dgrayblue,
        outlineColor:color.dgrayblue
    }

}
