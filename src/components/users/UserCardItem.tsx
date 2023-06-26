import {IUserCard} from "../../Interface.ts";
import {TagShowItem} from "../tag/TagShowItem.tsx";
import {Card,Row,Col} from "antd";
import color from "../../constants/color.ts";

interface Props {
	user: IUserCard;
}

// users展示界面的用户卡片
export const UserCardItem = ({user}: Props) => {
	return (
		<Card className={"user-card"} bordered={true} style={{width:"300px",height:"130px",marginLeft:'20px'}}>
			<Row className={"user-card-upper"} style={{width:"400px",height:"130px",padding:'0px'}}>
				<Col className={"user-card-left"} span={6} style={{marginTop:'0px',marginRight:'0px'}}>
					<img src={user.avatar} style={{
						marginTop:'-10px',
						marginLeft:'-10px',
						width: '100px',
						height: '100px',
						borderRadius:'10px',
					}}/>
				</Col>
				<Col span={12}>
					<div className={"user-card-right"}>
					<p style={{marginTop:'0px',lineHeight:"0px",color:color.dgrayblue,fontSize:'14px'}}>{user.username}</p>
					<p style={{lineHeight:"5px",fontSize:'8px',color:color.gray}}>{user.location}</p>
					<p style={{lineHeight:"0px",fontSize:'12px'}}>{`${user.followers_number} followers`}</p>
					<p style={{lineHeight:"5px",fontSize:'10px',color:color.gray}}>{user.profile}</p>
					</div>
					<div className={"user-card-footer"}>
						{user.fields.slice(0, 3).map((field) => (
							<TagShowItem tag_name={field.content}/>
						))}
					</div>
				</Col>
			</Row>
		</Card>
	);
};
