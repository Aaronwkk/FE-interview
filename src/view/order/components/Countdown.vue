<template>
    <div v-if="timeLeft.total > 0" class="countdown-container">
      <!-- <p>距离超时还剩：</p> -->
      <div class="countdown">
        <span>{{ timeLeft.days }}</span> 天
        <span>{{ timeLeft.hours }}</span> 小时
        <span>{{ timeLeft.minutes }}</span> 分钟
        <span>{{ timeLeft.seconds }}</span> 秒
      </div>
    </div>
    <div v-else>
      <p>已超时</p>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
// import { message } from 'ant-design-vue';

// 定义 props
const props = defineProps({
  deadline: {
    type: Number,
    required: true,
    validator(value) {
      return !isNaN(value); // 确保传入的是有效的时间戳
    }
  }
});

// 计算剩余时间
const calculateTimeLeft = () => {
  const now = new Date().getTime();
  const difference = props.deadline - now;

  if (difference <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const timeLeft = ref(calculateTimeLeft());

// 每秒更新一次倒计时
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    timeLeft.value = calculateTimeLeft();
    if (timeLeft.value.total <= 0) {
      clearInterval(intervalId);
      // message.warning('截止日期已过期');
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* .countdown-container {
  text-align: center;
}

.countdown {
  font-size: 1.5em;
  margin-top: 10px;
}

.countdown span {
  display: inline-block;
  width: 50px;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-right: 5px;
  text-align: center;
} */
</style>