export function orderList() {
  const now = new Date();
  const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  return {
    success: true,
    data: {
      total: 50, // 总数可以根据需要调整
      list: Array.from({ length: 100 }, (_, i) => ({
        id: `id_${i + 1}`,
        title: `Task Title ${i + 1}`,
        status: ['pending', 'processing', 'completed'][Math.floor(Math.random() * 3)],
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        createTime: daysAgo(Math.floor(Math.random() * 30)), // 创建时间在过去的30天内随机选取
        deadline: i >= 5 ?+new Date() + i* 100 * 1000:+new Date(), // 截止日期在未来10天内随机选取
        user: {
          id: `user_id_${Math.floor((i + 1) / 5) + 1}`, // 每5个任务对应同一个用户
          nickname: `User_${Math.floor((i + 1) / 5) + 1}`
        }
      }))
    }
  };
}
