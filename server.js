var express = require("express");
var appAngular = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var jwt = require("jsonwebtoken");
var config = require("./server/config");

var user = require("./server/routes/user.js");
var expense = require("./server/routes/expense.js");
var qlxe = require("./server/routes/qlxe.js");
var qltaixe = require("./server/routes/qltaixe.js");
var qlchuyenxe = require("./server/routes/qlchuyenxe.js");
var qlkhachhang = require("./server/routes/qlkhachhang");
var qlhanghoa = require("./server/routes/qlhanghoa");
var qlthuchi = require("./server/routes/qlthuchi.js");
var port = process.env.PORT || config.serverport;

var path = require("path");

mongoose.connect(
  config.database,
  function(err) {
    if (err) {
      console.log(
        "Error connecting database, please check if MongoDB is running."
      );
    } else {
      console.log("Connected to database...");
    }
  }
);

// use body parser so we can get info from POST and/or URL parameters
appAngular.use(bodyParser.urlencoded({ extended: true }));
appAngular.use(require("body-parser").json({ type: "*/*" }));
// use morgan to log requests to the console
appAngular.use(morgan("dev"));

// Enable CORS from client-side
appAngular.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
// app.use(express.static(__dirname+"/dist"));
appAngular.use(express.static("dist"));

// basic routes

appAngular.get("/", function(req, res) {
  // res.render('index.html');
  res.sendFile("index.html");
});

appAngular.post("/register", user.signup);
appAngular.post("/taoxe", qlxe.create);
appAngular.post("/dsxe", qlxe.getDanhsachXE);
appAngular.get("/dsxeban", qlxe.getDanhsachXEB);
appAngular.post("/taotaixe", qltaixe.create);
appAngular.get("/dstaixe", qltaixe.getDanhsachTXE);
appAngular.get("/dstaixeban", qltaixe.getDanhsachTXEB);
appAngular.post("/taochuyenxe", qlchuyenxe.create);
appAngular.post("/dschuyenxe", qlchuyenxe.getdschuyenxe);
appAngular.post("/timcxtt", qlchuyenxe.timcxtt);
appAngular.post("/getmcxcn", qlchuyenxe.getmcxcn);
appAngular.post("/taokh", qlkhachhang.create);
appAngular.get("/dskhachhang", qlkhachhang.getDSKH);
appAngular.post("/getmangkhcn", qlkhachhang.getmangkhcn);
appAngular.post("/dshanghoa", qlhanghoa.getdshanghoa);
appAngular.post("/taohanghoa", qlhanghoa.create);
appAngular.post("/postmangctt",qlhanghoa.postmangctt)
appAngular.post("/taothuchi", qlthuchi.create);
appAngular.post("/dsthuchi", qlthuchi.getDSTC);
appAngular.post("/timdsthuchi", qlthuchi.timdsTC);
appAngular.post("/timbcdsthuchi", qlthuchi.timdsBCTC);
appAngular.post("/timbctctk", qlthuchi.timdsBCTCTK);
appAngular.post("/gethhcxtn",qlhanghoa.gethhcxtn);
appAngular.post("/timchieuchay",qlhanghoa.timchieuchay);
appAngular.post("/getidmcxcn",qlhanghoa.getidmcxcn)
appAngular.post("/getdskhcn",qlhanghoa.getdskhcn);
appAngular.post("/dshhcongno",qlhanghoa.dshhcongno)

// express router
var apiRoutes = express.Router();

appAngular.use("/api", apiRoutes);

apiRoutes.post("/login", user.login);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token

// authenticated routes
apiRoutes.get("/", function(req, res) {
  res.status(201).json({ message: "Welcome to the authenticated routes!" });
});

//------------Xe-----------

apiRoutes.post("/updatexe", qlxe.getUpdateXE);
apiRoutes.post("/deletexe", qlxe.getDeleteXE);
apiRoutes.post("/gettenxe", qlxe.getTenXe);

//------------endXe-----------

//------------TaiXe-----------

apiRoutes.post("/updatetxe", qltaixe.getUpdateTXE);
apiRoutes.post("/deletetxe", qltaixe.getDeleteTXE);
apiRoutes.post("/gettentxe", qltaixe.getTenTaiXe);

//------------endTaiXe-----------

//------------HangHoa-----------

apiRoutes.post("/updatehh", qlhanghoa.getUpdateHH);
apiRoutes.post("/deletehh", qlhanghoa.getDeleteHH);
apiRoutes.post("/gettencxe", qlhanghoa.getTenChuyenXe);
apiRoutes.post("/gettenkhach", qlhanghoa.getTenKhach);
apiRoutes.post("/gettenkhachctt", qlhanghoa.getTenKhachCTT);
apiRoutes.post("/timidobject", qlhanghoa.getDSidobject);

//------------endHangHoa-----------

//------------ChuyenXe-----------

apiRoutes.post("/posttencx", qlchuyenxe.getdanhsachHHCX);
apiRoutes.post("/updatechuyenxe", qlchuyenxe.getUpdateCX);
apiRoutes.post("/postngayxp", qlchuyenxe.getdanhsachNXP);
apiRoutes.post("/deletechuyenxe", qlchuyenxe.DeleteCX);

//------------endChuyenXe-----------

//------------KhachHang-----------

apiRoutes.post("/posttenkh", qlkhachhang.getdanhsachHHKH);
apiRoutes.post("/updatetkhachhang", qlkhachhang.getUpdateKH);
apiRoutes.post("/deletekhachhang", qlkhachhang.deleKH);

//------------endKhachHang-----------

apiRoutes.post("/updatethuchi", qlthuchi.getUpdateTC);

apiRoutes.post("/deletethuchi", qlthuchi.deleTC);

apiRoutes.get("/user/:id", user.getuserDetails); // API returns user details

apiRoutes.put("/user/:id", user.updateUser); // API updates user details

apiRoutes.put("/password/:id", user.updatePassword); // API updates user password

apiRoutes.post("/expense/:id", expense.saveexpense); // API adds & update expense of the user

apiRoutes.delete("/expense/:id", expense.delexpense); //API removes the expense details of given expense id

apiRoutes.get("/expense/:id", expense.getexpense); // API returns expense details of given expense id

apiRoutes.post("/expense/total/:id", expense.expensetotal); // API returns expense details of given expense id

apiRoutes.post("/expense/report/:id", expense.expensereport); //API returns expense report based on user input

// kick off the server
appAngular.listen(port);
console.log("Expense Watch app is on listening " + port);

// const { app, BrowserWindow } = require('electron')

// require('electron-debug')();

// let win;

// function createWindow () {

//   win = new BrowserWindow({
//     width: 600, 
//     height: 600,
//     backgroundColor: '#ffffff',
//     icon: `file://${__dirname}/dist/assets/logo.png`
//   })


//   win.loadURL(`file://${__dirname}/dist/index.html`)


//   win.on('closed', function () {
//     win = null
//   })
// }


// app.on('ready', createWindow)


// app.on('window-all-closed', function () {

  
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', function () {
 
//   if (win === null) {
//     createWindow()
//   }
// })
