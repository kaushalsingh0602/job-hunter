if(process.env.NODE_ENV != 'production'){
    require('dotenv').congif();
}
module.exports({
    PORT:process.env.PORT
})