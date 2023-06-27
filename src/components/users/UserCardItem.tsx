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
		<Card className={"user-card"} bordered={true} style={{width:"17rem",height:"7rem",marginRight:'1rem'}}>
			<Row className={"user-card-upper"} style={{width:"22rem",height:"8rem"}}>
				<Col className={"user-card-left"} span={6} >
					<img src={user.avatar} style={{
						marginTop:'-0.7rem',
						marginLeft:'-0.6rem',
						width: '5.5rem',
						height: '5.5rem',
						borderRadius:'0.5rem',
					}}/>
				</Col>
				<Col span={12} >
					<div className={"user-card-right"}>
					<p style={{marginTop:'0rem',lineHeight:"0rem",color:color.dgrayblue,fontSize:'0.9rem'}}>{user.username}</p>
					<p style={{lineHeight:"0.3rem",fontSize:'0.1rem',color:color.gray}}>{user.location}</p>
					<p style={{lineHeight:"0.5rem",fontSize:'0.4rem'}}>{`${user.followers_number} followers`}</p>
					<p style={{lineHeight:"0.5rem",fontSize:'0.3rem',color:color.gray}}>{user.profile}</p>
					</div>
					<div className={"user-card-footer"}>
						{user.fields.slice(0,4).map((field) => (
							<TagShowItem tag_name={field.content}/>
						))}
					</div>
				</Col>
			</Row>
		</Card>
	);
};
