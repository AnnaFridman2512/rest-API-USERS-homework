import express from 'express';
import loadJson from 'load-json-file';

const app = express();

app.use(express.json());//Used to parse JSON bodies

//CRUD - create read apdate delete
//Protocol CRUD Servers: REST (Representational state transfer)
//Rest URL /[object name]s - this is how we write the routs, name of the object in numerous way 'user'- /users



let users = loadJson.sync('users.json'); //Saving the data  from the wanted file to a variable 


app.get("/users",  (req, res) => {//Get all users
    res.send(users);//Using loadJson to get the data from products.json file 
});

//Create user 
app.post("/users", (req, res) => {//If we want to create a new user we use post instead of get
    users.push(req.body);//"users" is an array, so we can push a new object to it, each product is an object
                            //express doesn't know how to deal with adding objects so we use body that came with express
                            //it parses the object                  

    res.send("added");
});

//Get single user from the users array 
app.get("/users/:acountNumber", (req, res) => {//If we want to see a single user by its acountNumber, we use :acountNumber , we save whatever is writen after users/ and saves it in acount-number variable (can call "acount-number" whatever instead)
    let [user]= users.filter(user => user.acountNumber == req.params.acountNumber);//"products" is an array so we filter it by id. the distructuring is to get a single object and not an array with a single object
                                                                          //params.id gets the :productId variable
    res.send(user);
});

//Update single user 
app.put("/users/:acountNumber", (req, res) => {//If we want to update a product we use put instead of get. we use :id to save whatever is writen after products/ and saves it in id variable (can call "id" whatever instead)
    let [user]= users.filter(user => user.acountNumber == req.params.acountNumber);//"users" is an array so we filter it by acount-number. the distructuring is to get a single object and not an array with a single object
    user.name = req.query.name, //So through the query string  we can reach it's values and change them
    user.age = req.query.age,
    user.acountNumber = req.query.age.acountNumber
    res.send("updated");
});

//Delete single user
app.delete("/users/:acountNumber", (req, res) => {//If we want to delete a user we use delete instead of get
    users = users.filter(user => user.acountNumber != req.params.acountNumber);//"users" is an array so we filter it by acountNumber. 
    res.send("deleted");
});

app.listen(8080);

console.log('Server up and running!!!');