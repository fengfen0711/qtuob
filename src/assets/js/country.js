import axios from "axios"

function Dictionaries1(dateLink) {
	let dataList = ""
	var data = {
		"deptCode": "000095"
	}
	console.log(dateLink)
	 return new Promise((resolve, reject) => {
		axios.post(dateLink + '/dic/base/querybasedic', data)
			.then(function(response) {
				var dataCode = response.data.code;
				if(dataCode == "SYS_S_000") {
//					console.log(JSON.stringify(response.data.output))
					dataList =JSON.stringify(response.data.output) 
					localStorage.dataList=dataList
				 	resolve(response.data)
				}
			})
			.catch(function(error) {
				reject(error);
			});
		})

//	getData('https://yesno.wtf/api')
//		.then(data => {
//			console.log(data)
//		})

}
export {
	Dictionaries1
}