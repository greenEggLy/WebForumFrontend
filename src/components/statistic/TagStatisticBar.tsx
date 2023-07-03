import { WordCloud } from '@ant-design/plots';
import {useEffect, useState} from "react";
import {StatisticData} from "../../constants/test.ts";
import {IQuestionCard, IStatisticTag} from "../../Interface.ts";
interface Props {
    type:string;
}
//// 此处type为所需的统计图表的种类，包括用户回答的Tag,用户提问的Tag,用户收藏的Tag等等
//// 接口为Statistic Tag
export const StatisiticWordCloud = ({type}: Props) => {
    const [data, setData] = useState<IStatisticTag[]>([]);
    useEffect(() => {
        // asyncFetch();
        setData(StatisticData);
    }, []);
    // const asyncFetch = () => {
    //     fetch('')
    //         .then((response) => response.json())
    //         .then((json) => setData(json))
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };
    return <WordCloud data={data}
                      wordField={"content"}
                      weightField={"number"}
                      wordStyle={{
                fontFamily: 'Verdana',
                fontSize: [24, 80],
            }}
                      colorField={"content"}
                />;
};

export default StatisiticWordCloud;
