import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://playground-803a6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase()
const shoppingInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-text")
const addBtn = document.getElementById("add-btn")
const ulEl = document.getElementById("ul-el")

addBtn.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(shoppingInDB, inputValue)
    
    clearOut()
})

onValue(shoppingInDB, function(snapshot){
    let shoppingArray = Object.values(snapshot.val())
    shoppingListClear()

    for(let i=0 ; i<shoppingArray.length ; i++) {
        listEverything(shoppingArray[i])
    }
})

function shoppingListClear() {
    ulEl.innerHTML = ""
}

function clearOut() {
    inputEl.value = ""
}

function listEverything(item) {
    ulEl.innerHTML += `<li>${item}</li>` 
}
