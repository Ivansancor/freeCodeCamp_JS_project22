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




let priceToPay = 3.26;

let change = [
    {name: "Hundreds",
        quantity: 1,
        value: 100
    },
    {name: "Twenties",
        quantity: 3,
        value: 20
    },
    {name: "Tens",
        quantity: 2,
        value: 10
    },
    {name: "Fives",
        quantity: 11,
        value: 5
    },
    {name: "Ones",
        quantity: 90,
        value: 1
    },
    {name: "Quarters",
        quantity: 17,
        value: 0.25
    },
    {name: "Dimes",
        quantity: 31,
        value: 0.1
    },    
    {name: "Nickels",
        quantity: 41,
        value: 0.05
    },
    {name: "Pennies",
        quantity: 101,
        value: 0.01
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




const calculateChange = dueToGive => {
    const statusTxt = dueToGive.toFixed(2) === calculateBoxTotalValue().toFixed(2) ? "CLOSED" : dueToGive > calculateBoxTotalValue() ? "INSUFFICIENT_FUNDS" : "OPEN";



    const resultChange = [];
    let dueForCust = dueToGive;
    for(item of change) {
        if (dueForCust > item.value && item.quantity !== 0){
            let resultObject = {};
            if (dueForCust/item.value > item.quantity) {
                resultObject = {
                    "name" : item.name,
                    "quantity": item.quantity,
                    "totalDue" : (item.quantity*item.value).toFixed(2)
                }
                resultChange.push(resultObject);
                dueForCust = dueForCust - resultObject["totalDue"];

                item.quantity -= resultObject.quantity;
                displayBoxContents();
            } else if (dueForCust/item.value <= item.quantity) {
            const quantity = parseInt(dueForCust / item.value);
            const totalDue = (quantity*item.value);
            resultObject = {
                "name" : item.name,
                "quantity": quantity,
                "totalDue" : totalDue.toFixed(2)
            }
            resultChange.push(resultObject);
            dueForCust = dueForCust - totalDue;
            
            item.quantity -= resultObject.quantity;
            displayBoxContents();
            }
        }
    }

    


    let changeInfo = "";
    for(item of resultChange) {
        changeInfo += `<li>${item.name}: ${item.quantity} for a total of $${item.totalDue}</li>`;
    }



    let msgInfo = "";

    switch (statusTxt) {
        case "INSUFFICIENT_FUNDS":
            msgInfo = "You do not have enough change for customer!";
            break;
        case "CLOSED":
            msgInfo = "You need to give the customer everything inside the box!";
            break;
        default:
            msgInfo = "Customer needs to get:";
            break;
    }

    changeDueDiv.innerHTML = `
        <span style="color:black">Status: ${statusTxt}</span>
        <p style="margin:1rem 0;">${msgInfo}</p>
        <ul>${statusTxt !== "INSUFFICIENT_FUNDS" ? changeInfo : ""}</il>
        `;

}




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
        calculateChange(due);
        changeDueDiv.style.display = "block";
    }
}

const addToBox = cash => {
    for(item of change) {
        if (cash > item.value) {
            const quantity = parseInt(cash / item.value);
            item.quantity += quantity;
            cash -= quantity*item.value;
        }
        displayBoxContents();
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
        
        if (cashReceived < priceToPay) {
            alert("Customer does not have enough money to purchase the item");
            return;
        } else {
            addToBox(cashReceived)
            displayStats(cashReceived, changeDue);
            displayChangeDue(changeDue);
        }
    }
}




cashInput.addEventListener("keyup", e => {
 if (e.key === "Enter" ) {
    evaluateInput();
}
});

purchaseBtn.addEventListener("click", evaluateInput);