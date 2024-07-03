const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");



const calculateChange = () => {
    if (cashInput.value === "") {
        alert("Please enter an amount");
        return;
    }
    // const regex = /[e-+]/gi;
    const cashReceived = cashInput.value;
    // .replace(regex, "");
    let status = "All good";
    changeDue.innerHTML = `
    <span>Status: ${status}</span>
    <p>${cashReceived}</p>
    `;
}


// const priceToPay = 3.26;
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