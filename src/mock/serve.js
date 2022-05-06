//json,图片格式webpack是默认暴露的，不需要在响应文件中进行导出即可引入
import banner from './banner'
import floor from './floor'
//导入mock，配置需要模拟的请求地址和需要模拟返回的数据，需要APP在入口文件执行一次
import Mock from 'mockjs'
Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});
