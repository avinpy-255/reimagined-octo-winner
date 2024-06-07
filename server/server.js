import app from './app.js'

app.listen(process.env.PORT, ()=>{
    console.log(`listening on: ${process.env.PORT}`);
})