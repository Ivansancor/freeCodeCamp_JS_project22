const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const cashReceivedP = document.getElementById("cash-received-p")
const cashReceivedSpan = document.getElementById("cash-received-span")


const priceToPay = 3.26;


const calculateChange = () => {
    if (cashInput.value === "") {
        alert("Please enter an amount");
        return;
    }
    else {
        const regex = /e|\+|-/gi;
        const cashReceived = Number(cashInput.value.replace(regex, ""));
        cashInput.value = "";

        if (cashReceived < priceToPay) {
            alert("Customer does not have enough money to purchase the item");
            return;
        } else if (cashReceived === priceToPay) {
            changeDue.textContent = "No change due - customer paid with exact cash";
            changeDue.style.display = "block";
            cashReceivedSpan.innerHTML= `${cashReceived} &#8680;`;
            cashReceivedP.style.display = "block"
        } else {
        }
        
        // const status = cashReceived === priceToPay ? "CLOSED" : cashReceived > priceToPay ? "OPEN" : "INSUFFICIENT_FUNDS";
        // changeDue.innerHTML = `
        // <span>Status: ${status}</span>
        // <p></p>
        // `;
        // changeDue.style.display = "block";

    }
}


// const change = [
//     {name: pennies,
//         quantity: 101
//     },
//     {name: nickels,
//         quantity: 21
//     },
//     {name: dimes,
//         quantity: 31
//     },
//     {name: quarters,
//         quantity: 17
//     },
//     {name: ones,
//         quantity: 90
//     },
//     {name: fives,
//         quantity: 11
//     },
//     {name: tens,
//         quantity: 2
//     },
//     {name: twenties,
//         quantity: 3
//     },
//     {name: hundreds,
//         quantity: 1
//     }
// ]

cashInput.addEventListener("keyup", e => {
 if (e.key === "Enter") {
    calculateChange();
}
});

purchaseBtn.addEventListener("click", calculateChange);