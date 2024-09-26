import _ from "lodash";
import login from "./login.json";
import button from "./button.json";
import tooltip from "./tooltip.json";
import pagination from "./pagination.json";
import datePicker from "./datePicker.json";

//chia ra từng file JSON của từng màn và từng common (để tìm kiếm và chỉnh sửa cho dễ)
//sau đó tiến hành merge lại thành 1 file chung ở FE:

export const JSONCommonFE = (language: string) => {
  switch (language) {
    case "en":
      return {
        ..._.merge({
          ...login.en,
          ...button.en,
          ...tooltip.en,
          ...pagination.en,
          ...datePicker.en,
        }),
      };
    case "vi":
      return {
        ..._.merge({
          ...login.vi,
          ...button.vi,
          ...tooltip.vi,
          ...pagination.vi,
          ...datePicker.vi,
        }),
      };
    case "la":
      return {
        ..._.merge({
          ...login.la,
          ...button.la,
          ...tooltip.la,
          ...pagination.la,
          ...datePicker.la,
        }),
      };
  }
};
