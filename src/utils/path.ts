export const getTagName = (url: string) => {
	const regex = /tagged\/(\w+)/;
	const match = url.match(regex);
	if (!match) return "";
	return match[1];
}

export const getQuestionId = (url: string) => {
	const regex = /question\/(\w+)/;
	const match = url.match(regex)
	if (!match) return ""
	return match[1]
}

export const getUrlParam = (name:string) =>
{
	let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象\
	let r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) return unescape(r[2]); return null; //返回参数值
}


