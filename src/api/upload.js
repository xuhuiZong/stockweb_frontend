
import axios from 'axios'

export async function uploadImage(imageFile) {
  const formData = new FormData()
  // 保持和后端一致
  formData.append('image', imageFile)

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // 正常情况下，直接把响应返回给调用方
    return response
  } catch (error) {
    // 在这里可以打印或处理错误
    console.error('uploadImage 出错：', error)
    // 再把错误抛出去给外层 handleUpload 捕获
    throw error
  }
}
