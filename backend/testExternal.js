const axios = require('axios');
(async ()=>{
  try{
    const res = await axios.post('http://localhost:5000/ai/external-info',{query:'javascript'});
    console.log('status',res.status);
    console.log('data',res.data);
  }catch(e){
    if(e.response) console.error('err status', e.response.status, e.response.data);
    else console.error(e.message);
  }
})();