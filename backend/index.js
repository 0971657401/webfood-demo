const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// Kết nối MongoDB
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch(err => console.log("Database connection error:", err));

// Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  image: String,
  cart: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: {
        type: Number,
        default: 1
      },
      image: String
    }
  ]
});


const userModel = mongoose.model("user", userSchema);

// API
app.get("/", (req, res) => {
  res.send("Server is running");
});

//addProductToCart
// API để thêm sản phẩm vào giỏ hàng
app.post("/addToCart", async (req, res) => {
  const { userId, productId, name, price, image } = req.body;

  try {
    // Tìm user theo ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const productInCart = user.cart.find(item => item.productId === productId);

    if (productInCart) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      productInCart.qty += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
      user.cart.push({
        productId,
        name,
        price,
        image
      });
    }

    // Lưu lại thay đổi
    await user.save();
    res.send({ message: "Product added to cart", alert: true, cart: user.cart });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).send({ message: "Internal Server Error", alert: false });
  }
});

//getProductInCart
// API để lấy giỏ hàng của người dùng
app.get("/getCart/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }

    res.send({ cart: user.cart });
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).send({ message: "Internal Server Error", alert: false });
  }
});

//deleteProduct
// API để xóa sản phẩm khỏi giỏ hàng
app.post("/removeFromCart", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Tìm user theo ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", alert: false });
    }

    // Lọc bỏ sản phẩm khỏi giỏ hàng
    user.cart = user.cart.filter(item => item.productId !== productId);

    // Lưu lại thay đổi
    await user.save();
    res.send({ message: "Product removed from cart", alert: true, cart: user.cart });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    res.status(500).send({ message: "Internal Server Error", alert: false });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send({
        message: "Passwords do not match",
        alert: false
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "Email đã tồn tại",
        alert: false
      });
    }

    const newUser = new userModel(req.body);
    await newUser.save();

    res.send({
      message: "Đăng kí thành công!",
      alert: true
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received for email:", email);
    
    // thêm await để đồng bộ việc check mail, và lưu trữ trên cookie. Tiếp theo sẽ check pass
    const user = await userModel.findOne({ email: email });
    
    if (user) {
      if (user.password === password) {
        const dataSend = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        };

        console.log("Login successful for user:", dataSend);
        res.send({ message: "Đăng nhập thành công!", alert: true, data: dataSend });
      } else {
        console.log("Email hoặc tà ikhoản không đúng: ", email);
        res.status(400).send({ message: "Mật khẩu không chính xác", alert: false });
      }
    } else {
      console.log("Email not found:", email);
      res.status(400).send({ message: "Email không có sẵn, vui lòng đăng ký!", alert: false });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
});

// product section 
const schemaProduct = mongoose.Schema({
  name:String,
  category:String,
  image:String,
  price:String,
  description:String,
});
const productModel = mongoose.model("product", schemaProduct)

// Save product in data
//api
app.post("/uploadProduct",async(req, res)=>{
  console.log(req.body)
  const data = new productModel(req.body)
  console.log(data)
  
  const datasave = await data.save()
  res.json({message : "Thêm sản phẩm thành công!"})
})

//
app.get("/product",async (req, res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

// Server is running
app.listen(PORT, () => console.log("Server is running at port :" + PORT));
