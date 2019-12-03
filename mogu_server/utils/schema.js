
var mongoose =require("mongoose");

var Schema =mongoose.Schema;

var student_Schema =new Schema({
    phone:Number,
    username:String,
    password:String,
    dbpwd:String,
    sid:Number, //学生编号
    cid:Number,  //班级编号
    flag:Boolean,
    banji_code:String,
    email:String,
    md:String
});

exports.Student =mongoose.model("student",student_Schema);

//用来储存用户的编号
var uid_Schema =new Schema({
    name:String,
    id:Number
})

exports.Uid =mongoose.model("uid",uid_Schema)


var teacher_Schema =new Schema({
    phone:Number,
    username:String,
    password:String,
    dbpwd:String,
    sid:String, //讲师编号
    current_bj:String,  //当前上课班级
    flag:Boolean
});

exports.Teacher = mongoose.model("teacher",teacher_Schema);


var banji_schema = new Schema({
    banji_text:String,
    banji_code:String
})

exports.Banji = mongoose.model("banji",banji_schema);


var tea_banji =new Schema({
    tid:String,
    tname:String,
    tbanji:Array
})

exports.Tlist =mongoose.model("tea_banji",tea_banji)

//获取电影数据
var move =new Schema({
    rating:Object,
    genres: Array,
    title: String,
    year: String,
    images: Object,
    id: String
})

exports.Move=mongoose.model("move",move)


//  react  卖座电影 联系-------------
var maizuoBanner =new Schema({
    bannerId:Number,
    imgUrl:String,
    name:String
})

exports.MaizuoBanner=mongoose.model("maizuo_banner",maizuoBanner)



//  react  蘑菇街 项目   -------------
var mogu_code =new Schema({
    phone:Number,
    code:Number,
    time:Date
})

exports.Mogucode=mongoose.model("mogu_code",mogu_code)

// 查询商品信息表
var shangchenglist =new Schema({
    img:String,
    iid:String,
    price:Number,
    orgPrice:Number,

})

exports.Shangchenglist=mongoose.model("shangchenglist",shangchenglist)

