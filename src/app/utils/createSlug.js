function createSlug(title) {
  const today = new Date();

  // Lấy ngày, tháng, năm rút gọn (dd-mm-yy)
  const datePart = [
    String(today.getDate()).padStart(2, '0'),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getFullYear()).slice(-2)
  ].join('-');

  // Chuyển tiêu đề thành dạng slug
  const slug = title
    .toLowerCase()
    .normalize('NFD')                     // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')     // xóa dấu
    .replace(/[^a-z0-9\s-]/g, '')        // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '-');               // thay khoảng trắng bằng dấu -

  return `${slug}-${datePart}`;
}
module.exports = createSlug;
