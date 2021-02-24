const express = require('express');

const app = express();
const firstRouter = express.Router();

app.use(express.json());

firstRouter.get("/first", (req, res) => res.status(200).json("fruits fruits fruits!"))
.post("/second", (req, res) => res.status(200).json(`your chosen fruit is ${req.body.fruit}`));

app.use("/fruits", firstRouter);

app.get("/route-with-params/:cat", express.json(), (request, response) => {
    //console.log(request.params);
    console.log("req query value:", request.query.key);    
    response.status(200).json(`hello ${request.params.cat}`);
    //console.log(request.body);
});

app.get("/", express.json(), (request, response) => {  
    console.log("I'm the second get / route");  
    response.status(200).json("I'm the second get /");
});

app.post("/", express.json(), (request, response) => {    
    console.log("request.body:", request.body);

    response.status(200).json("hello world!");
});

app.delete("/delete", (req, res) => {
    console.log("I'm a delete request");
    res.status(200).json("you deleted something");
});

app.route("/chained").get((req, res) => res.status(200).json("I'm in the chained route!"))
.post((req, res) => res.status(200).json(`hello, ${req.body.name}!`));

const secret = (req, res, next) => {
    if (req.body.secret === "this is the secret"){
        next();
    } else {
        res.status(403).json("bad request! you don't know the secret!")
    }
}

app.post("/secret", secret, (req, res) => {
    res.status(200).json("you're in!")
});

app.listen(3000, () => console.log("your app is running on port 3000"));