const mongoose = require('mongoose')

//原始資料
const rooms = require('../data/rooms')

//資料庫
const Room = require('../models/roomModel')

//再連接資料庫
mongoose.connect(
  'mongodb+srv://ken75319:Q8Y3qqN3kh4xIbVF@cluster0.gissy.mongodb.net/Bookit?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)

const importData = async (req, res) => {
  try {
    await Room.deleteMany()
    console.log('All rooms are deleted')

    await Room.insertMany(rooms)
    console.log('Data Successfully Imported')

    process.exit() //*
  } catch (error) {
    console.log(error.message)
    process.exit(1) //*
  }
}

importData()
