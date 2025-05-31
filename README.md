# 🧠 Code Snippet Manager

แอปพลิเคชันสำหรับบันทึกและจัดการโค้ดที่ใช้บ่อย แยกตามหมวดหมู่ภาษา รองรับการกรองภาษา และคัดลอกโค้ดด้วยปุ่มเดียว พร้อมแจ้งเตือนแบบ SweetAlert2

## ✨ Features

- เพิ่มโค้ดพร้อมระบุชื่อและภาษา
- แสดงรายการโค้ดทั้งหมด
- กรองโค้ดตามภาษา (Filter)
- คัดลอกโค้ดด้วยปุ่ม Copy (พร้อมแจ้งเตือน swal2)
- UI ทันสมัยด้วย Tailwind CSS
- ไม่มีระบบล็อกอิน ใช้บนเครื่องส่วนตัว (localhost)

---

## 🛠️ Stack

- **Frontend:** Next.js + Tailwind CSS + Axios + SweetAlert2
- **Backend:** Node.js (Express)
- **Database:** MySQL2

---

## 📦 การติดตั้ง

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/AomSirawit/vibeCodeSnippet.git
cd code-snippet-manager
```

---

### 2. ติดตั้ง Frontend

```bash
cd frontend
npm install
npm run dev
```

> หน้านี้จะรันบน `http://localhost:5173`

---

### 3. ติดตั้ง Backend

```bash
cd ../backend
npm install
node index.js
```

> Backend จะรันที่ `http://localhost:4000`

---

### 4. สร้างฐานข้อมูล MySQL

สร้างฐานข้อมูล `codesnippet` แล้วรัน SQL นี้:

```sql
CREATE DATABASE codesnippet;

USE codesnippet;

CREATE TABLE snippets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  code TEXT,
  language VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

ตรวจสอบให้แน่ใจว่า `backend/index.js` เชื่อมต่อกับ MySQL ถูกต้อง:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // เปลี่ยนรหัสตามของคุณ
  database: 'codesnippet'
});
```

---

## 🖥 ตัวอย่าง Screenshot

> แสดงตัวอย่างหน้าฟอร์มและรายการโค้ด

![Snippet List UI](https://via.placeholder.com/800x400?text=Your+UI+Screenshot)

---

## 📌 หมายเหตุ

- โปรเจกต์นี้ออกแบบสำหรับใช้งานบนเครื่องส่วนตัว (localhost)
- ไม่มีระบบยืนยันตัวตน (Auth)
- เหมาะสำหรับเก็บ Snippet ส่วนตัวแบบ Offline หรือ Dev Tools ส่วนตัว

---

## 🙌 เครดิต

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [SweetAlert2](https://sweetalert2.github.io/)
