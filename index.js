const express = require('express');
const cors = require('cors');
const contactRouter = require('./contact'); 
const affiliateRouter = require('./Register');  

const app = express();
app.use(cors());
app.use(express.json());


app.use("/contact", contactRouter);  
app.use("/Register", affiliateRouter); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
