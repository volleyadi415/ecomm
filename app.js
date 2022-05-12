const PORT = 5001;                       
const express =require("express");
const router = require("./routes/router");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc=require("./swagger.json")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/",router);


app.use("*",(req , res, next)=>{

	const err = new Usererror(`Requested URL ${req.path} Not Found!`,404);	
	next(err);
});

app.use((err,req ,res ,next)=>{
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		sucsses : 0 ,
		message : err.message , 
		stack : err.stack
	})
})



app.listen(PORT,()=>{
    console.log( `This users app listening at : http://localhost:${PORT}`);

});


