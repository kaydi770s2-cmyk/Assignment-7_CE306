# Assignment-7_CE306

<img width="1096" height="814" alt="image" src="https://github.com/user-attachments/assets/ad99b636-50a4-4def-bbfb-92c2cbb12d0c" />


<img width="1089" height="799" alt="image" src="https://github.com/user-attachments/assets/dc52ea53-0429-4d7c-9625-5087540fdc45" />


<img width="1075" height="922" alt="image" src="https://github.com/user-attachments/assets/354ca1e2-288d-46cb-b365-410f54082aa3" />


<img width="1059" height="947" alt="image" src="https://github.com/user-attachments/assets/becff564-e399-4626-9932-1b9f6b9586a5" />


<img width="1088" height="919" alt="image" src="https://github.com/user-attachments/assets/ce4bfbbb-1422-4a1c-839d-f4a15d7c8e3c" />


<img width="1107" height="867" alt="image" src="https://github.com/user-attachments/assets/eae4f68f-0ab7-47c7-aeda-a8d627cb1bf5" />

POST /products: ใช้สำหรับสร้างและเพิ่มข้อมูลสินค้าใหม่ลงในฐานข้อมูล MongoDB โดยคืนค่า 201 Created
GET /products: ดึงข้อมูลรายการสินค้าทั้งหมดที่มีอยู่ในระบบ
GET /products/:id: ค้นหาและแสดงรายละเอียดของสินค้าเฉพาะชิ้น โดยระบุผ่าน ObjectID
GET /products/search/:keyword: ค้นหาสินค้าจากชื่อ โดยใช้ Regex แบบไม่สนใจตัวพิมพ์เล็ก-ใหญ่ ($options: "i")
GET /products/category/:category: กรองและแสดงรายการสินค้าทั้งหมดตามหมวดหมู่ที่ระบุ
GET /products/available: กรองและแสดงเฉพาะรายการสินค้าที่มีจำนวนคงเหลือในสต็อกมากกว่า 0 (stock > 0)
PATCH /products/:id/add-stock: อัปเดตเพิ่มจำนวนสินค้าในสต็อกตามค่า amount ที่ส่งมา (ตรวจสอบความถูกต้องไม่ให้ amount <= 0)
DELETE /products/:id: ลบข้อมูลสินค้าออกจากฐานข้อมูลตาม ID โดยตรวจสอบก่อนว่ามีสินค้านั้นอยู่จริงหรือไม่ หากไม่มีจะคืนค่า 404 Not Found
