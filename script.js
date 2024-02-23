import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let shoppingArray = Object.entries(snapshot.val())
    shoppingListClear()

    for(let i=0 ; i<shoppingArray.length ; i++) {

        let currentItem = shoppingArray[i]
        let currentItemID = shoppingArray[0]
        let currentItemValue = shoppingArray[1]

        listEverything(currentItem)
    }
})

function shoppingListClear() {
    ulEl.innerHTML = ""
}

function clearOut() {
    inputEl.value = ""
}

function listEverything(items) {

    let itemID = items[0]
    let itemValue = items[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){

        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationInDB)
    })

    ulEl.append(newEl)
}
