import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

// Tạo ứng dụng Express
const app = express();
const PORT = 3003;

// Cấu hình middleware
app.use(bodyParser.json());
app.use(cors());

// Kết nối với MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Thay đổi username của bạn
  password: 'root', // Thay đổi mật khẩu của bạn
  database: 'webbanhdangian' // Tên cơ sở dữ liệu
});

// Kiểm tra kết nối MySQL
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
    return;
  }
  console.log('Kết nối MySQL thành công!');
});

// API để lưu đơn hàng
// API để lưu đơn hàng
app.post('/order', (req, res) => {
    const { customerName, phone, address, cart } = req.body;
  
    if (!customerName || !phone || !address || !cart || cart.length === 0) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin đơn hàng!' });
    }
  
    // Bắt đầu giao dịch MySQL để đảm bảo tính toàn vẹn
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Lỗi khi bắt đầu giao dịch:', err);
        return res.status(500).json({ error: 'Lỗi hệ thống!' });
      }
  
      // Lưu thông tin khách hàng
      const insertOrderQuery = `
        INSERT INTO orders (customer_name, phone, address) 
        VALUES (?, ?, ?)
      `;
      connection.query(insertOrderQuery, [customerName, phone, address], (err, result) => {
        if (err) {
          console.error('Lỗi khi lưu đơn hàng:', err);
          connection.rollback();
          return res.status(500).json({ error: 'Không thể lưu đơn hàng!' });
        }
  
        const orderId = result.insertId;
  
        // Lưu chi tiết giỏ hàng
        const insertCartQuery = `
          INSERT INTO order_items (order_id, product_name, quantity) 
          VALUES ?
        `;
  
        const cartItems = cart.map((item) => [orderId, item.name, item.quantity]);
        connection.query(insertCartQuery, [cartItems], (err) => {
          if (err) {
            console.error('Lỗi khi lưu chi tiết giỏ hàng:', err);
            connection.rollback();
            return res.status(500).json({ error: 'Không thể lưu chi tiết giỏ hàng!' });
          }
  
      
          connection.commit((err) => {
            if (err) {
              console.error('Lỗi khi hoàn tất giao dịch:', err);
              connection.rollback();
              return res.status(500).json({ error: 'Không thể hoàn tất đơn hàng!' });
            }
  
            res.status(200).json({ message: 'Đặt hàng thành công!' });
          });
        });
      });
    });
  });
  

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
