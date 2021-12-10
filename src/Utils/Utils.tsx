import axios from "axios";
import { rootURL } from "./Constants";
export function getDotsYYYYMMDD(dtr:string|null|undefined){
  if (dtr == null|| dtr==undefined) {
    return "Err";
  }
  if (!dtr) {
    return "";
  }
  if (dtr.length == 0) {
    return "";
  }
  let date = new Date(dtr);
  let year = date.getFullYear().toString().substr(2,4);
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if(day.length==1){
    day="0"+day;
  }
  if(month.length==1){
    month="0"+month;
  }
  return year + "." + month + "." + day;
}
export function getYYYYMMDD(dtr: string | null|undefined) {
  if (dtr == null|| dtr==undefined) {
    return "Err";
  }
  if (!dtr) {
    return "";
  }
  if (dtr.length == 0) {
    return "";
  }
  let date = new Date(dtr);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "년 " + month + "월 " + day + "일";
}
export function getDDay(dateStr: string) {
  const setDate = new Date(dateStr);
  const now = new Date();
  const distance = now.getTime() - setDate.getTime();
  const day = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;
  let text = `${day}일째`;
  return text;
}
export const headers = {
  Authorization: "Bearer " + localStorage.getItem("accessToken"), //the token is a variable which holds the token
  "Content-Type": "application/json",
};

export const SpringAxios = axios.create({
  baseURL: `${rootURL}`,
});
SpringAxios.interceptors.request.use(function (config) {
  return { ...config, headers: headers };
});
