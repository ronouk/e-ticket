// const confirmationButton = document.getElementById("confirmaton-button");
// const confirmationHoverButton = document.getElementById("confirmaton-hover-button");

// function buttonMouseOver(){
//     confirmationButton.classList.add("hidden");
//     confirmationHoverButton.classList.remove("hidden");
// }

// function buttonMouseOut(){
//     confirmationButton.classList.remove("hidden");
//     confirmationHoverButton.classList.add("hidden");
// }

const mainContent = document.getElementById("main-content-container");
const confirmationScreen = document.getElementById("confirmation-screen");

function showConfirmation() {
    // console.log(mainContent.classList);
    // console.log(confirmationScreen.classList);
    mainContent.classList.add("hidden");
    confirmationScreen.classList.remove("hidden");
}

function showMainContent() {
    confirmationScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
}

//seat left counter
const seatLeftCounterElement = document.getElementById("seats-left-counter");
let seatLeftCounter = seatLeftCounterElement.innerText;
let seatLeftCounterValue = parseInt(seatLeftCounter);

//total seat counter
const totalSelectedSeatElement = document.getElementById("total-selected-seat");
let totalSeatCounter = totalSelectedSeatElement.innerText;
let totalSeatCounterValue = parseInt(totalSeatCounter);

//all seat array;

const letterArrayAll = "ABCDEFGHIJ";
const letterArray = letterArrayAll.split("");
let seatArray = [];
// console.log(letterArray, letterArray.length);
let i, j;
for (i = 0; i < letterArray.length; i++) {
    for (j = 1; j <= 4; j++) {
        seatArray.push(letterArray[i] + j)
    }
}

// console.log(seatArray)

//selected seat array
let selectedSeatArray = [];

//show selected seat element
const showSelectedSeatElement = document.getElementById("show-selected-seat");

//seat selection color change
const seatLetters = document.getElementsByClassName("seat-letter");

//price selector
const totalPriceElement = document.getElementById("total-price");
const totalPrice = totalPriceElement.innerText;
let totalPriceValue = parseInt(totalPrice);

//coupon Code button
const couponInputBoxElement = document.getElementById("coupon-input-box");
let couponInputBoxValue = couponInputBoxElement.value;
const couponApplyButton = document.getElementById("coupon-apply-button");

//total discount
const totalDiscountElement = document.getElementById("total-discount");
let totalDiscountValueText = totalDiscountElement.innerText;
let totalDiscountValue = parseInt(totalDiscountValueText);


const grandTotalElement = document.getElementById("grand-total");
let grandTotalValueText = grandTotalElement.innerText;
let grandTotalValue = parseInt(grandTotalValueText);
// console.log(grandTotalValue, typeof grandTotalValue);

//next button and confirmation
const nextButton = document.getElementById("next-button");
const phoneNumberElement = document.getElementById("passenger-phone");

// main function

const seatSelected = function (e) {
    const elementId = e.target.id;

    if (seatArray.indexOf(elementId) === -1) {
        alert("Not a seat")
    }

    else {

        if (selectedSeatArray.length < 4) {

            if (selectedSeatArray.indexOf(elementId) === -1) {

                selectedSeatArray.push(elementId);
                // console.log(selectedSeatArray.length)

                //show selected seat

                let selectedSeat = document.createElement("div");
                selectedSeat.classList.add("flex", "justify-between");
                // console.log(selectedSeat.classList);

                let selectedSeatNumberElement = document.createElement("p");
                selectedSeatNumberElement.innerText = elementId;

                const classNameElement = document.createElement("p")
                classNameElement.innerText = "Economy";

                const seatPriceElement = document.createElement("p");
                seatPriceElement.innerText = 550;

                selectedSeat.appendChild(selectedSeatNumberElement);
                selectedSeat.appendChild(classNameElement);
                selectedSeat.appendChild(seatPriceElement);

                // console.log(selectedSeat);

                showSelectedSeatElement.appendChild(selectedSeat);


                addBackgroundColorById(elementId);
                seatLeftCounterValue = seatLeftCounterValue - 1;
                seatLeftCounterElement.innerText = seatLeftCounterValue;
                totalSeatCounterValue = totalSeatCounterValue + 1;
                totalSelectedSeatElement.innerText = totalSeatCounterValue;

                if (selectedSeatArray.length === 4) {
                    couponApplyButton.removeAttribute("disabled");
                }

                //total price
                totalPriceValue = totalSeatCounterValue * 550;
                totalPriceElement.innerText = totalPriceValue;

                //Coupon discount

                couponApplyButton.addEventListener("click", function (e) {
                    if (couponInputBoxElement.value === "NEW15") {
                        totalDiscountValue = totalPriceValue * 0.15;
                        totalDiscountElement.innerText = totalDiscountValue;

                        grandTotalValue = totalPriceValue - totalDiscountValue;
                        grandTotalElement.innerText = grandTotalValue;
                    }

                    else if (couponInputBoxElement.value === "COUPLE20") {
                        totalDiscountValue = totalPriceValue * 0.20;
                        totalDiscountElement.innerText = totalDiscountValue;

                        grandTotalValue = totalPriceValue - totalDiscountValue;
                        grandTotalElement.innerText = grandTotalValue;
                    }

                    else {
                        alert("Invalid Coupon Code");
                        e.stopImmediatePropagation();
                    }
                })

                //grand price
                grandTotalValue = totalPriceValue;
                grandTotalElement.innerText = grandTotalValue;

                //next button event
                phoneNumberElement.addEventListener("keyup", function () {
                    const phoneNumberValue = phoneNumberElement.value;

                    if (selectedSeatArray.length > 0 && phoneNumberValue.length > 0) {
                        nextButton.removeAttribute("disabled");
                    }

                    else {
                        nextButton.setAttribute("disabled", "disabled");
                    }

                })

            } else {
                alert("Seat already selected");
            }

        }

        else {
            alert("Maximum seat selected")
        }
    }

    // console.log(selectedSeatArray);
}

for (let seatLetter of seatLetters) {
    seatLetter.addEventListener("click", seatSelected);
}