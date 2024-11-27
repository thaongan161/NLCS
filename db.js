import mysql from 'mysql2';

// Tạo kết nối với MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Thay đổi thành username của bạn
  password: 'root', // Thay đổi mật khẩu của bạn
  database: 'webbanhdangian' // Tên cơ sở dữ liệu
});

// Kiểm tra kết nối
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL: ' + err.stack);
    return;
  }
  console.log('Kết nối MySQL thành công');
});

export default connection;
