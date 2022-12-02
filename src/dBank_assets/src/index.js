import { dBank } from "../../declarations/dBank";


window.addEventListener("load", async function () {
    // console.log("loaded!");
    update();    
});

document.querySelector("form").addEventListener("submit",async function(event){
    // console.log("submitted");
    event.preventDefault();
    const button = event.target.querySelector("#submit-btn");

    const inputAmount=parseFloat(document.getElementById("topUp-amount").value);
    const outputAmount=parseFloat(document.getElementById("withdrawl-amount").value);    
    
    button.setAttribute("disabled", true);

    if(document.getElementById("topUp-amount").value.length != 0){
        await dBank.topUp(inputAmount);
    }
    if(document.getElementById("withdrawl-amount").value.length != 0){
        await dBank.withdrawl(outputAmount);
    }

    update();

    await dBank.compound();

    document.getElementById("topUp-amount").value="";
    document.getElementById("withdrawl-amount").value="";

    button.removeAttribute("disabled");
});

async function update(){
    const currentAmount=await dBank.checkBalance();
    document.getElementById("value").innerText=Math.round(currentAmount * 100)/100;
};