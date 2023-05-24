// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化云函数
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const db = cloud.database();
    const result = await db.collection('testGit').get();
    return {
      success: true,
      result: result
    };
  } catch (err) {
    return {
      success: false,
      errCode: err.errCode || -1,
      errMsg: err.message || '未知错误'
    };
  }
}
