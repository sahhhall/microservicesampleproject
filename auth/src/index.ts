import express from 'express';

const app = express();
app.use(express.json());



app.get('/api/users/currentuser',(req, res)=> {
    res.send("Hi there!")
})


let port: number = 3000; 

app.listen(port , () => {
    console.log("server connected on port 3000!!!!!!!!")
})