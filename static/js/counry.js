export function getData() {
	var dataList=""
	var data = {
		"deptCode": "000300"
	}
	this.$http.post('http://192.168.171.12:9005' + '/base/querybasedic', data)
		.then(res => {
			var dataCode = res.data.code;
			console.log(res.data);
			if(dataCode == "SYS_S_000") {
				dataList=res.data.output
				// 关系
//				this.nexusList = res.data.output.relatoInsured.codeList;
//				console.log(this.nexusList)
//				// 证件类型
//				this.couponList = res.data.output.certfType.codeList;
//				// 国籍
//				this.nationalityarr = res.data.output.nationality.codeList;
			} else {
				Toast(res.data.desc);
			}
			return dataList;
		}, res => {
			console.log(res.data);
		})
}
export default{
	getData
}
