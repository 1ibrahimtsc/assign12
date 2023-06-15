const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5d8nja0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db("SummerCampDb").collection("users");
    const menuCollection = client.db("bistroDb").collection("menu");
    const reviewCollection = client.db("bistroDb").collection("reviews");
    // const cartCollection = client.db("bistroDb").collection("carts");
    const cartCollection = client.db("SummerCampDb").collection("carts");
    const classesCollection = client.db("SummerCampDb").collection("classes");
    const paymentCollection = client.db("SummerCampDb").collection("payments");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // Warning: use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

    /**
     * 0. do not show secure links to those who should not see the links
     * 1. use jwt token: verifyJWT
     * 2. use verifyAdmin middleware
     */

    // users related apis
    // app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      // const user = req.body;
      //const query = { email: user.email };

      const user = {
        name: req.body.name,
        email: req.body.email,
      };
      const query = { email: req.body.email };

      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exists" });
      }

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // update users student to instructor or admin
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("-------------------------------", req.body);

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body },
        { upsert: true }
      );
    });

    // security layer: verifyJWT
    // email same
    // check student
    app.get("/users/student/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ student: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { student: user?.role === "student" };

      res.send(result);
    });

    // security layer: verifyJWT
    // email same
    // check instructor
    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ instructor: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { instructor: user?.role === "instructor" };

      res.send(result);
    });

    // security layer: verifyJWT
    // email same
    // check admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === "admin" };

      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // menu related apis
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    //app.post("/menu", verifyJWT, verifyAdmin, async (req, res) => {
    app.post("/menu", async (req, res) => {
      const newItem = req.body;
      const result = await menuCollection.insertOne(newItem);
      res.send(result);
    });

    //app.delete('/menu/:id', verifyJWT, verifyAdmin, async (req, res) => {
    app.delete("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    // review related apis
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // cart collection apis
    // app.get("/carts", verifyJWT, async (req, res) => {
    app.get("/carts", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/carts", verifyJWT, async (req, res) => {
      const email = req.body.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const selecteditem = req.body;

      const getclass = await classesCollection.findOne({
        _id: new ObjectId(req.body.classId),
      });

      let numberofstudents;
      if (getclass.numberofstudents) {
        numberofstudents = getclass.numberofstudents + 1;
      } else {
        numberofstudents = 1;
      }

      const emailofstudents = [];
      if (getclass.emailofstudents) {
        emailofstudents.push(...getclass.emailofstudents, req.body.email);
      } else {
        emailofstudents.push(req.body.email);
      }

      console.log("------emailofstudents------", emailofstudents);
      const classUpdate = await classesCollection.updateOne(
        { _id: new ObjectId(req.body.classId) },
        {
          $set: {
            emailofstudents: emailofstudents,
            numberofstudents: parseInt(numberofstudents),
          },
        }
      );

      const result = await cartCollection.insertOne(selecteditem);
      res.send(result);
    });

    /*

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    }); 
    
    */

    // delete cart item using get request
    app.delete("/deleteselectedclasses/:id", async (req, res) => {
      const id = req.params.id;

      const getclass = await cartCollection.findOne({ _id: new ObjectId(id) });

      console.log("----getclass----------", getclass);

      let numberofstudents;
      if (getclass.numberofstudents) {
        numberofstudents = getclass.numberofstudents - 1;
      }

      const classUpdate = await classesCollection.updateOne(
        { _id: new ObjectId(getclass.classId) },
        {
          $set: {
            numberofstudents: parseInt(numberofstudents),
          },
        }
      );

      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // classes collection apis
    //get classes
    app.get("/classes", async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    // api for get my classes
    // TODO use verifyJWT
    app.get("/myclasses", verifyJWT, async (req, res) => {
      const email = req.query.email;

      console.log("-------------email-----------------", email);

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;

      console.log("-------------decodedEmail-----------------", decodedEmail);
      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { instructorEmail: email };
      const result = await classesCollection.find(query).toArray();
      console.log("-------------result-----------------", result);
      res.send(result);
    });

    // api for get myselectedclasses

    app.get("/myselectedclasses", verifyJWT, async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;

      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const user = await usersCollection.find({ email: email }).toArray();

      const idarray = user[0].selectedclasses;
      //const map1 = array1.map(x => x * 2);
      //new ObjectId("x");
      const getidarray = idarray.map((x) => {
        return new ObjectId(x);
      });
      //console.log("-----------getidarray---------", getidarray);
      const result = await classesCollection
        .find({
          _id: {
            $in: getidarray,
          },
        })
        .toArray();
      //console.log("-------------result-----------------", result);
      res.send(result);
    });

    // api for removed selected class
    app.get("/deleteselectedclasses", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const id = req.query.id;

      if (!email) {
        res.send([]);
      }

      const decodedEmail = req.decoded.email;

      if (email !== decodedEmail) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const user = await usersCollection.find({ email: email }).toArray();

      const idarray = user[0].selectedclasses;
      const modifiedidarray = idarray.filter((element) => element !== id);
      console.log("------------idarray--------------", idarray);
      console.log("------------modifiedidarray--------------", modifiedidarray);

      const updateDoc = {
        $set: {
          selectedclasses: modifiedidarray,
        },
      };

      const result = await usersCollection.updateOne(
        { email: email },
        updateDoc
      );
      res.send(result);
    });

    ////add classes
    app.post("/classes", async (req, res) => {
      const item = req.body;

      const result = await classesCollection.insertOne({
        ...req.body,
        status: "pending",
        enrolledstudent: [],
        feedback: "",
      });
      res.send(result);
    });

    // update class pending to aproved
    app.put("/classes/:id", async (req, res) => {
      const id = req.params.id;
      console.log("--------------aproved-----------------", req.body);

      const result = await classesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body },
        { upsert: true }
      );
    });

    // create payment intent
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // payment related api
    app.post("/payments", verifyJWT, async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentCollection.insertOne(payment);

      const query = {
        _id: { $in: payment.cartItems.map((id) => new ObjectId(id)) },
      };


      const deleteResult = await cartCollection.deleteMany(query);

      

      const result = await classesCollection.updateOne(
        query,
        updateDoc
      );

      res.send({ insertResult, deleteResult });
    });

    app.get("/admin-stats", verifyJWT, verifyAdmin, async (req, res) => {
      const users = await usersCollection.estimatedDocumentCount();
      const products = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();

      // best way to get sum of the price field is to use group and sum operator
      /*
        await paymentCollection.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: '$price' }
            }
          }
        ]).toArray()
      */

      const payments = await paymentCollection.find().toArray();
      const revenue = payments.reduce((sum, payment) => sum + payment.price, 0);

      res.send({
        revenue,
        users,
        products,
        orders,
      });
    });

    /**
     * ---------------
     * BANGLA SYSTEM(second best solution)
     * ---------------
     * 1. load all payments
     * 2. for each payment, get the menuItems array
     * 3. for each item in the menuItems array get the menuItem from the menu collection
     * 4. put them in an array: allOrderedItems
     * 5. separate allOrderedItems by category using filter
     * 6. now get the quantity by using length: pizzas.length
     * 7. for each category use reduce to get the total amount spent on this category
     *
     */
    app.get("/order-stats", verifyJWT, verifyAdmin, async (req, res) => {
      const pipeline = [
        {
          $lookup: {
            from: "menu",
            localField: "menuItems",
            foreignField: "_id",
            as: "menuItemsData",
          },
        },
        {
          $unwind: "$menuItemsData",
        },
        {
          $group: {
            _id: "$menuItemsData.category",
            count: { $sum: 1 },
            total: { $sum: "$menuItemsData.price" },
          },
        },
        {
          $project: {
            category: "$_id",
            count: 1,
            total: { $round: ["$total", 2] },
            _id: 0,
          },
        },
      ];

      const result = await paymentCollection.aggregate(pipeline).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("boss is sitting");
});

app.listen(port, () => {
  console.log(`Summer Camp School is sitting on port ${port}`);
});
