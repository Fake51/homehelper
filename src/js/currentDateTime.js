import { format } from "date-fns";
import { addEvent } from "./eventLoop";
import { create } from "./utils";

const formatDate = date => format(date, "LLLL do");
const formatTime = date => format(date, "HH:mm");

const setDateTime = (date, dateHeader, timeHeader) => {
  const newDate = formatDate(date);
  const newTime = formatTime(date);

  if (dateHeader.innerText !== newDate) {
    dateHeader.innerText = newDate;
  }

  if (timeHeader.innerText !== newTime) {
    timeHeader.innerText = newTime;
  }
};

const currentDateTime = () => {
  const dateHeader = create('h2');
  const timeHeader = create('h1');
  const date = new Date();

  addEvent(() => setDateTime(new Date(), dateHeader, timeHeader), 1000)

  setDateTime(new Date(), dateHeader, timeHeader);

  return [dateHeader, timeHeader];
}

export default currentDateTime;
