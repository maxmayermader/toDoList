const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
//app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to DB")).catch(console.error);


const Todo = require('./dataSchema.js');

app.get('/todos', async (req, res) => {
    const query = {};
    const todos = await Todo.find(query);
    console.log(todos);
    res.json(todos);
})

app.post('/todo/new', (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        _id: p_id,
        text: req.body.text
    });

    todo.save();

    res.json(todo);

})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})


/////////////////////

//app.listen(3001, () => console.log("Server started on port 3001"));
// app.get("/", async (req, resp) => {
//   const query = {};
//   const allProducts = await Product.find(query);
//   console.log(allProducts);
//   resp.send(allProducts);
// });

// app.post("/insert", async (req, res) => {
//   console.log(req.body);
//   const p_id = req.body._id;
//   const ptitle = req.body.title;
//   const pprice = req.body.price;
//   const pdescription = req.body.description;
//   const pcategory = req.body.category;
//   const pimage = req.body.image;
//   const prate = req.body.rating.rate;
//   const pcount = req.body.rating.count;

//   const formData = new Product({
//       _id: p_id,
//       title: ptitle,
//       price: pprice,
//       description: pdescription,
//       category: pcategory,
//       image: pimage,
//       rating: { rate: prate, count: pcount },
//   });

//   try {
//       // await formData.save();
//       await Product.create(formData);
//       const messageResponse = { message: `Product ${p_id} added correctly` };
//       res.send(JSON.stringify(messageResponse));
//   } catch (err) {
//       console.log("Error while adding a new product:" + err);
//   }
// });


// app.get("/:id", async (req, resp) => {
//   const id = req.params.id;
//   const query = { _id: id };
//   const oneProduct = await Product.findOne(query);
//   console.log(oneProduct);
//   resp.send(oneProduct);
// });

// app.delete("/delete", async (req, res) => {
//   console.log("Delete :", req.body);
//   try {
//       const query = { _id: req.body._id };
//       await Product.deleteOne(query);
//       const messageResponse = {
//           message: `Product ${req.body._id} deleted correctly`,
//       };
//       res.send(JSON.stringify(messageResponse));
//   } catch (err) {
//       console.log("Error while deleting :" + p_id + " " + err);
//   }
// });

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});
