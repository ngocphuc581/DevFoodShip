const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./Account_Shipper');
require('./Payment');
require('./account_user');
require('./cart');
require('./food');
require('./History_Order');
const Account_Shipper = mongoose.model('Account_Shipper');
const Payment = mongoose.model('Payment');
const Account_User = mongoose.model('Account_User');
const Cart = mongoose.model('Cart');
const Food = mongoose.model('Food');
const History_Order = mongoose.model('History_Order');

const MongoURI = 'mongodb+srv://ngocphuc:ngocphuc@cluster0.jm3jwgm.mongodb.net/DevFood?retryWrites=true&w=majority';
mongoose.connect(MongoURI,{
    useNewUrlParser : true,
})
mongoose.connection.on('Connected',()=>{
    console.log('Connect DB Success');
})
mongoose.connection.on('Error', ()=>{
    console.log('Connect Error');
})
app.use(express.json());

//------------------------------------------------------Account_Shipper----------------------------------------------------\\
app.post('/Account_Shipper/insert', (req,res) =>{
    const Account =  new Account_Shipper({
        account : req.body.account,
        password : req.body.password,
        fullName : req.body.fullName,
        phone : req.body.phone,
        email : req.body.email,
        state : false,
        currentLatitude : req.body.currentLatitude,
        currentLongtitude : req.body.currentLongtitude,
    })
    Account.save();
    res.json(Account);
})
app.post('/Account_Shipper/get',async (req,res)=>{
    const getAccount = await Account_Shipper.findOne(
        {phone : req.body.phone, password : req.body.password}
    )
    res.json(getAccount);
})
app.post('/Account_Shipper/updatePosition', async(req,res)=>{
    const update = await Account_Shipper.findOneAndUpdate(
        {_id : req.body._id},
        {
            currentLatitude : req.body.currentLatitude,
            currentLongtitude : req.body.currentLongtitude,
        },
        {new : true}
    )
    res.json(update);
})
//------------------------------------------------------Get Order----------------------------------------------------\\
app.get('/OrderShipper/get', async(req,res)=>{
    const cart = await (await Payment.find({order_Status : 'Đang chuẩn bị', receive_Method : 'Nhận tại nhà'})).map(item=>item.id_Cart);
    const user = await  (await Cart.find({_id : cart})).map(item=>item.id_Account);
    const info = await Account_User.find({_id : user});
    res.json(info);
})
app.post('/OrderShipper/getOrder', async (req,res)=>{
    const cart = await (await Cart.find({id_Account : req.body.id_Account, state : false, receive_Method : 'Nhận tại nhà'})).map(item=>item._id);
    const order = await (await Payment.find({id_Cart : cart})).filter(item=>item.order_Status =='Đang chuẩn bị')
    res.json(order[0]);
})
app.post('/OrderShipper/getOrder2', async (req,res)=>{
    const cart = await (await Cart.find({id_Account : req.body.id_Account, state : false, receive_Method : 'Nhận tại nhà'})).map(item=>item._id);
    const order = await (await Payment.find({id_Cart : cart})).filter(item=>item.order_Status =='Đang chuẩn bị')
    res.json(order);
})
app.post('/OrderShipper/getCart', async (req,res)=>{
    const cart = await Cart.findOne({_id : req.body._id});
    res.json(cart);
})
app.post('/OrderShipper/getFood', async(req,res)=>{
    const food = await Food.findOne({_id : req.body._id});
    res.json(food);
})
app.post('/OrderShipper/changeState', async(req,res)=>{
    const changeState = await Payment.findByIdAndUpdate(
        {_id : req.body._id},
        {order_Status : req.body.order_Status},
        {new : true},
    )
    res.json(changeState);
})
app.post('/OrderShipper/receiveOrder', async(req,res)=>{
    const ReceiveOrder = new History_Order({
        id_Payment : req.body.id_Payment,
        id_Shipper : req.body.id_Shipper,
    })
    ReceiveOrder.save();
    res.json(ReceiveOrder);
})
app.post('/OrderShipper/changeStateReceive', async(req,res)=>{
    const changeState = await Payment.findByIdAndUpdate(
        {_id : req.body._id},
        {order_Status : 'Đã nhận đơn'},
        {new : true},
    )
    res.json(changeState);
})
app.post('/OrderShipper/checkOrder', async(req,res)=>{
    const getHistory = await (await History_Order.find({id_Shipper : req.body.id_Shipper})).map(item=>item.id_Payment);
    const getPayment = await (await Payment.find({_id : getHistory})).filter(item=>item.order_Status =='Đã nhận đơn' || item.order_Status=='Đang giao')
    res.json(getPayment[0]);
})
app.post('/OrderShipper/getUser', async(req,res)=>{
    const User = await Account_User.findById({_id : req.body._id});
    res.json(User);
})
app.post('/OrderShipper/changeStateShipper', async(req,res)=>{
    const changeState = await Account_Shipper.findByIdAndUpdate(
        {_id : req.body._id},
        {state : req.body.state},
        {new : true},
    )
    res.json(changeState);
})

//------------------------------------------------------History----------------------------------------------------\\
app.post('/HistoryShipper/getHistory', async(req,res)=>{
    const History = await (await History_Order.find({id_Shipper : req.body.id_Shipper})).map(item=>item.id_Payment);
    const getHistory = await Payment.find({_id : History, order_Status : 'Hoàn tất'});
    res.json(getHistory)
})
app.get('/',(req,res)=>{
    res.send('WELCOME TO NODEJS');
})
app.listen(3000,()=>{
    console.log('Listening on port 3000');
})