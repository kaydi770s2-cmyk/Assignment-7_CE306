const mongoose = require('mongoose');

// กำหนด Schema สำหรับสินค้าตามโจทย์ข้อ 1
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,

  // เพิ่ม field ใหม่ 2 ตัวตามข้อกำหนด:
  category: { 
    type: String, 
    required: true // เป็น String และจำเป็นต้องกรอก
  },
  stock: { 
    type: Number, 
    default: 0,   // ค่าเริ่มต้นเป็น 0
    min: 0        // ห้ามติดลบ
  }
});

module.exports = mongoose.model('Product', ProductSchema);