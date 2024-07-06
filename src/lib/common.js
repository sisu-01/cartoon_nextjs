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
  } else if (type === 'yy.mm.dd') {
    return [String(year).slice(2), month, day].join('.');
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

/**
 * 주어진 날짜가 현재 날짜로부터 6개월 이내인지 확인하는 함수
 * 
 * @param {string} dateString - ISO 8601 형식의 날짜 문자열 (예: '2024-06-09T13:33:40.000Z')
 * @returns {boolean} - 주어진 날짜가 6개월 이내이면 true, 아니면 false
 */
export const isWithinSixMonths = (dateString) => {
  const now = new Date();
  const givenDate = new Date(dateString);
  const sixMonths = new Date();
  sixMonths.setMonth(now.getMonth() - 6);
  return givenDate >= sixMonths;
}

/**
 * 주어진 날짜가 오늘로부터 며칠 전인지 계산
 * @param {String} dateString - '2024-06-22T10:22:34.000Z' 형식의 날짜 문자열
 * @returns {Number} - 주어진 날짜가 오늘로부터 며칠 전인지 나타내는 일 수
 */
export const calculateDaysAgo = (dateString) => {
  const givenDate = new Date(dateString);
  const today = new Date();

  // Calculate the difference in time
  const timeDifference = today - givenDate;

  // Convert time difference from milliseconds to days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
};

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