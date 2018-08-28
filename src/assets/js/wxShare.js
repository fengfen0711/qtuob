import axios from "axios"

function wxShare(dateLink) {
	let wxSharedataList = ""
	var data = {
		"shareUrl": window.location.href.split('#')[0]
	}
	console.log("dateLink====" + dateLink)
	return new Promise((resolve, reject) => {
		axios.post(dateLink, data)
			.then(function(response) {
				var dataCode = response.data.code;
				if(dataCode == "SYS_S_000") {
					console.log("response.data.output===" + JSON.stringify(response.data))
					wxSharedataList = JSON.stringify(response.data.output)
					localStorage.wxSharedataList = wxSharedataList
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
	wxShare
}