const express = require('express');
const zod = require('zod');
const app = express();
const schema = zod.array(zod.number());
app.use(express.json());

app.post('/health-checkup',(req,res)=>{
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(response.success===false){
        return;
    }

    res.send({response});

})


app.use((err,req,res,next)=> {
    res.send({
        "msg" : "Sorry we can't give you the desired input"
    })
});

 
app.listen(3000,()=>{
    console.log("server is running succesfully");
})