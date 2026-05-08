import datepicker from "js-datepicker";
import "js-datepicker/dist/datepicker.min.css";

import { DateTime } from "luxon";

const result = document.getElementById("result");
const btn = document.getElementById("calculate-btn");

const picker = datepicker("#birthdate", {
    maxDate: new Date(),

    formatter: (input, date) => {
        input.value = DateTime.fromJSDate(date).toFormat("dd/MM/yyyy");
    }
});

btn.addEventListener("click", () => {

    if (!picker.dateSelected) {
        result.innerHTML = "Please select a date";
        return;
    }

    const birthdate = DateTime.fromJSDate(picker.dateSelected);
    const today = DateTime.now();

    const diff = today.diff(birthdate, ["years", "months", "days"]).toObject();

    result.innerHTML = `
        You are <strong>
        ${Math.floor(diff.years)} years
        ${Math.floor(diff.months)} months
        ${Math.floor(diff.days)} days
        </strong> old
    `;
});