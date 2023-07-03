import {Select} from "antd";
import {useState} from "react";
import StatisiticWordCloud from "./TagStatisticBar.tsx";
import "./StatisticBar.css";
interface Props {
    options:{
        value:string,
        label:string
    }[]
}

export const StatisticBar=({options}:Props)=>{
    const [type,setType] = useState("");
    const handleChange = (value:string) => {
        setType(value);
    };
    return(
        <div className="statistic-all">
            <div className="statistic-select">
                <text>数据统计:</text>
                <Select
                    className="statistic-select-box"
                    options={options}
                    onChange={handleChange}
                />
            </div>
            <StatisiticWordCloud type={type}/>
        </div>


    );
}
export default StatisticBar;