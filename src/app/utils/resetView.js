const cron = require('node-cron');
const PageModel = require('../model/pageModel'); // đường dẫn đến model Page


function resetview(){
    // Reset dailyView mỗi ngày lúc 00:00
    cron.schedule('0 0 * * *', async () => {
      try {
        await PageModel.updateMany({}, { dailyView: 0 });
        console.log('[CRON] Đã reset dailyView');
      } catch (err) {
        console.error('Lỗi reset dailyView:', err);
      }
    });
    
    // Reset weekView vào 00:00 sáng thứ Hai
    cron.schedule('0 0 * * 1', async () => {
      try {
        await PageModel.updateMany({}, { weekView: 0 });
        console.log('[CRON] Đã reset weekView');
      } catch (err) {
        console.error('Lỗi reset weekView:', err);
      }
    });
}

module.exports =  resetview;
