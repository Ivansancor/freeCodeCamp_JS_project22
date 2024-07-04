const priceOfPurchase = document.getElementById("price-of-purchase");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueDiv = document.getElementById("change-due");
const registerBoxDrawerList = document.getElementById("register-box-drawer-list");
const registerBoxScreenTotal = document.getElementById("register-box-screen-total");
const cashReceivedP = document.getElementById("cash-received-p")
const cashReceivedSpan = document.getElementById("cash-received-span")
const changeDueP = document.getElementById("change-due-p")
const changeDueSpan = document.getElementById("change-due-span")


const priceToPay = 3.26;

const change = [
    {name: "Pennies",
        quantity: 101,
        value: 0.01
    },
    {name: "Nickels",
        quantity: 41,
        value: 0.05
    },
    {name: "Dimes",
        quantity: 31,
        value: 0.1
    },
    {name: "Quarters",
        quantity: 17,
        value: 0.25
    },
    {name: "Ones",
        quantity: 90,
        value: 1
    },
    {name: "Fives",
        quantity: 11,
        value: 5
    },
    {name: "Tens",
        quantity: 2,
        value: 10
    },
    {name: "Twenties",
        quantity: 3,
        value: 20
    },
    {name: "Hundreds",
        quantity: 1,
        value: 100
    }
]

const calculateBoxTotalValue = () => {
    return (change.reduce((acc, item) => acc + item.quantity * item.value, 0));
}

const displayPricetoPay = () => {
    priceOfPurchase.textContent = `Price to pay: $${priceToPay.toFixed(2)}`;
}

const displayBoxContents = () => {
    let htmlInjection = "";
    for(item of change) {
        htmlInjection += `<li>${item.name}: $${(item.value*item.quantity).toFixed(2)}<li>`;
    }
    registerBoxDrawerList.innerHTML = htmlInjection;
    registerBoxScreenTotal.textContent = `Total change available: $${calculateBoxTotalValue().toFixed(2)}`
}

window.onload = () => {
    displayPricetoPay();
    displayBoxContents();
}
// const calculateChange = cashToEval => {
//     const totalValueInBox = Number(calculateBoxTotalValue(change));
//     const statusTxt = (cashToEval - priceToPay) > totalValueInBox ? "INSUFFICIENT_FUNDS" : (cashToEval - priceToPay) === totalValueInBox ? "CLOSED" : "OPEN";

//     changeDue.innerHTML = `
//         <span>Status: ${statusTxt}</span>
//         <p></p>
//         `;
//         changeDue.style.display = "block";

    
// }

const displayStats = (paid, due) => {
    cashReceivedSpan.innerHTML= `${paid.toFixed(2)}`;
    cashReceivedP.style.display = "block";
    changeDueSpan.textContent = `${due.toFixed(2)}`;
    changeDueP.style.display = "block";
}
const displayChangeDue = due => {
    if (due === 0) {
        changeDueDiv.textContent = "No change due - customer paid with exact cash";
        changeDueDiv.style.display = "block";
    }
    else {
        changeDueDiv.textContent = "You owe some green back to customer!";
        changeDueDiv.style.display = "block";
    }
}
const evaluateInput = () => {
    if (cashInput.value === "") {
        alert("Please enter an amount");
        return;
    }
    else {
        const regex = /e|\+|-/gi;
        const cashReceived = Number(cashInput.value.replace(regex, ""));
        cashInput.value = "";
        const changeDue = (cashReceived - priceToPay);
        console.log(cashReceived)
        console.log(priceToPay)
        console.log(changeDue)
        console.log(typeof(cashReceived))
        console.log(typeof(priceToPay))
        console.log(typeof(changeDue))
        
        if (cashReceived < priceToPay) {
            alert("Customer does not have enough money to purchase the item");
            return;
        } else if (cashReceived === Number(priceToPay)) {
            displayStats(cashReceived, changeDue);
            displayChangeDue(0);
            return;
        } else {
            displayStats(cashReceived, changeDue);
            // calculateChange(cashReceived);
            displayChangeDue(1);
        }

    }
}


cashInput.addEventListener("keyup", e => {
 if (e.key === "Enter") {
    evaluateInput();
}
});

purchaseBtn.addEventListener("click", evaluateInput);