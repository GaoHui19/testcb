// 引入依赖模块
const cloud = require('wx-server-sdk')

// 初始化云函数
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })

// 云函数入口函数
exports.main = async (event, context) => {
  const {name, price, image, isGrounded, isLimited, size, color, description} = event;
  
  try {
    // 验证表单数据
    if (!name || !price || !image || !description) {
      throw new Error('请完善信息');
    }

    // 写入云开发数据库
    const db = cloud.database();
    const result = await db.collection('testGit').add({
      data: {
        name: name,
        price: price,
        image: image,
        isGrounded: isGrounded,
        isLimited: isLimited,
        size: size,
        color: color,
        description: description
      }
    });
    
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
