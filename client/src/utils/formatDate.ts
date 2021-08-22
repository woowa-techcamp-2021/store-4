export default (date: Date): string => {
  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 1000 / 60);
  if (diffMinutes < 1) {
    return '방금';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '어제';
  if (diffDays === 2) return '그제';
  if (diffDays < 7) {
    return `${diffDays}일 전`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks}주 전`;
  }

  const diffMonths = Math.ceil((diffWeeks * 7) / 30);
  if (diffMonths < 12) {
    return `${diffMonths}달 전`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}년 전`;
};
