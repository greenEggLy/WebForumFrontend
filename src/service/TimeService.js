export const debounce = (fn, delay = 500) => {
    let timeId = null;
    return function (inputValue) {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
};
/*
usage:
const inputDebounce = useRef(
    debounce((text) => {
      search_friends(text).then((res) => {
        setFilter(res);
      });
    }, 300)
  );

 */

export const parseDateFormat = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    return new Date(year, month, day, hour, min);
};