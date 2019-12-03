
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


//炉石项目 schema ---------------------------------------
//获取验证码数据
var code =new Schema({
    code:String,
    id: Number
})

exports.Code=mongoose.model("lushicheck",code)

//用户信息
var lushiusername =new Schema({
    card:Number,
    username:String,
    phone:Number,
    pwd:String,
    email:String,
    pic:String,
    nickname:String,
    sex:String,
    birthday:String,
    sign:String
})

exports.Lushiusername=mongoose.model("lushiusername",lushiusername)

//炉石 card  表
var lushicard =new Schema({
    card:Number,
    type:String
})

exports.Lushicard=mongoose.model("lushicard",lushicard)


//搜索查表 kazus  表
var kazus =new Schema({
    img:String,
    title:String,
    tips:String
})

exports.Kazus=mongoose.model("kazus",kazus)


//用户订阅 lushidingyues  表
var lushidingyues =new Schema({
    phone:Number,
    img:String,
    title:String,
    tips:String
})

exports.Lushidingyues=mongoose.model("lushidingyues",lushidingyues)


//用户信息
var newsonecommit =new Schema({
    id:Number,
    title:String,
    comment_list:Array
})

exports.newsonecommit=mongoose.model("newsonecommit",newsonecommit)