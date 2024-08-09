// 마감일 계산하기
export function getDDay(dead_line) {
  const today = new Date();     // 오늘 날짜
  const deadLine = new Date(dead_line);   // 마감일
  const timeDifference = deadLine - today;  // 날짜 차이 계산
  const dDay = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return dDay;
}