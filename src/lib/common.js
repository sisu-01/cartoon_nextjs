/**
 * String 날짜 형식을 예쁘게 만들어줘요~
 * @param {String} date 대충 날짜 형식 보내라잉
 * @param {String} type default, short
 * @returns {String} 예쁜 날짜
 */
export const dateFormat = (date, type='default') => {
  let d;
  if (typeof date === 'string') {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  }
  let year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let hour = '' + d.getHours();
  let min = '' + d.getMinutes();
  if (month.length < 2)
    month = '0'+month;
  if (day.length < 2)
    day = '0'+day;
  if (hour.length < 2)
    hour = '0'+hour;
  if (min.length < 2)
    min = '0'+min;
  const days = ['일','월','화','수','목','금','토',];

  if (type === 'short') {
    return [year, month].join('.');
  } else {
    return [year, month, day].join('.')+' ('+days[d.getDay()]+'요일)';
  }
}

/**
 * 날짜가 14일 이내인지 아닌지 알아보아요~
 * @param {String} date 날짜 형식의 문자열
 * @returns {Boolean} 현재 날짜로부터 15일 이내면 true, 아니면 false
 */
export const isDateWithin14Days = (date) => {
  const cartoonDate = new Date(date);
  cartoonDate.setHours(0, 0, 0, 0);
  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const timeDiff = cartoonDate.getTime() - currentDate.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff >= -14;
}

export const escapeRegex = (string)  => {
  // 정규 표현식에서 특수한 의미를 가지는 모든 문자를 이스케이프 처리
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&는 매치된 전체 문자열을 의미
}

/**
 * 검색어 강조 표시
 * @param {String} text 원본 텍스트
 * @param {String} searchText 검색어
 * @returns {String} span 들어간 텍스트
 */
export const highlightSearchText = (text, searchText) => {
  if (!searchText) {
    return text;
  }
  const escapedSearchText = escapeRegex(searchText);
  const regex = new RegExp(escapedSearchText, 'gi'); // 'gi' 플래그로 대소문자 구분 없이 전역 검색
  return text.replace(regex, `<span class='highlight-text'>${searchText}</span>`);
}