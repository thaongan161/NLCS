import express from 'express';
import path from 'path';
import open from 'open';

const app = express();
const PORT = process.env.PORT || 3003;

// Thiết lập đường dẫn tĩnh cho thư mục public
app.use(express.static(path.join(path.resolve(), 'public')));

// Thiết lập view engine là ejs
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Các tuyến đường
const routes = [
    { path: '/home', title: 'Trang Chủ - Bánh Dân Gian', view: 'home' },
    { path: '/gioithieu', title: 'Giới thiệu - Bánh Dân Gian', view: 'gioithieu' },
    { path: '/menu', title: 'Thực đơn - Bánh Dân Gian', view: 'menu' },
    { path: '/news', title: 'Tin tức - Bánh Dân Gian', view: 'news' },
    { path: '/contact', title: 'Liên hệ - Bánh Dân Gian', view: 'contact' }
];

// Tạo các tuyến đường một cách tự động
routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.render('layout', {
            title: route.title,
            view: route.view // Đảm bảo bạn đang gửi biến view
        });
    });
});


// Khởi động server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await open(`http://localhost:${PORT}/home`); // Mở trang chủ khi khởi động
});
