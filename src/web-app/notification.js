const axios = require("axios");
const User = require("./models/user");
const test = async function() {
  const users = await User.find();
  for (const user of users){
    axios.post("https://exp.host/--/api/v2/push/send",{
        to: user.token,
        title: "Alert!",
        body: "You are in danger zone"
    })
    .catch(err=>{
        console.log(err)
    })
  }
}
module.exports = test;
