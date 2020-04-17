const Sensor = require("./models/sensor");
const axios = require("axios");
const random = require('random')
// # https://api.thingspeak.com/channels/928486/fields/1.json?api_key=H4FP9VPOWGGFFW8G&results=2
// #
// # Channel ID, Key , Latitude , Longitude
// var Channel_ids = [
// 	["928486", "H4FP9VPOWGGFFW8G", "78.34851218171292", "17.44816515919385"],
// 	["937750", "EWD8UER61NQ0ZRTJ", "78.34658264354925", "17.44630528407582"],
// 	["938513", "O4WW98W6765MA9JA", "78.34594836629823", "17.445025016547746"],
// 	["939888", "QQHMD7VBXNLCSWOV", "78.35138312084916", "17.445929485086793"],
// 	["944545", "L0T1ZU83RF0GK9V7", "78.34931568996436", "17.445757526134088"],
// ];
// Get_data();
// CheckAllChannelIDS("944545","L0T1ZU83RF0GK9V7");

const StoreThingSpeakData =  async function (){
	
	let sensors = await Sensor.find()
	for (const order of sensors) {
		const temp_humid = await Get_data(order.channelId, order.channelKey).catch(err=>{
			console.log(err);
		});
		// console.log(temp_humid);
		const Temparature = temp_humid[0]
		const Humidity = temp_humid[1]
		const date = new Date;
		const time_date = date.getDate() + "/" +
			(date.getMonth() + 1) + "/" +
			date.getFullYear()
		const time = date.getHours() + ":" +
			date.getMinutes() + ":" +
			date.getSeconds();
		const num = random.int(min = 0, max = 1);
		await Sensor.findByIdAndUpdate(order._id, { $push: { data: { "date": time_date, "state": num, "time": time, "Temperature": Temparature, "Humidity": Humidity + "%" } } })
	}
}

async function Get_data(id, key) {
	var data = [];
		Temp_URL = (
			"https://api.thingspeak.com/channels/"
			+ id
			+ "/fields/1.json?api_key="
			+ key
			+ "&results=1"
		);
		Humid_URL = (
			"https://api.thingspeak.com/channels/"
			+ id
			+ "/fields/2.json?api_key="
			+ key
			+ "&results=1"
		);
		var req_temp = await send_req(Temp_URL);
		var req_humid = await send_req(Humid_URL);
		return [req_temp.feeds[0]["field1"], req_humid.feeds[0]["field2"]];
}
async function send_req(url) {
	var data = []
	await axios.get(url).then(res => {
		data = res.data;
	})
	.catch(err=> {
		console.log(err);
	})
	return data;
}
module.exports = StoreThingSpeakData;