const form = document.querySelector(".form")
const openModalBtn = document.querySelector(".btn-open")
const closeModalBtn = document.querySelector(".btn-close")
const modalContainer = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
 
let num = 0
openModalBtn.addEventListener("click", (ev) => {
  
  if (num > 0) {
    return
  }
  num++

  const overlay = document.createElement("di")
  overlay.classList.add("overlay")

  const modalSection = document.createElement("section")
  modalSection.classList.add("modal")

  const divFlex = document.createElement("div")
  divFlex.classList.add("flex")

  const userImg = document.createElement("span")
  userImg.classList.add("user")

  const btnClose = document.createElement("button")
  btnClose.addEventListener("click", () => {
    modalSection.remove()
    overlay.remove()
    num--
  })
  btnClose.textContent = "X"
  btnClose.classList.add("btn")
  btnClose.classList.add("btn-close")

  const divText = document.createElement("div")
  divText.classList.add("text")

  const h2 = document.createElement("h2")
  h2.textContent = "Receive news at your email"

  const form = document.createElement("form")
  form.classList.add("form")

  form.addEventListener("submit",  async (ev) => {
    ev.preventDefault()
  
    const emailData = {
      email: document.querySelector("#inputMail").value,
    }
    
    if(!verifyEmail(emailData.email)) {
      return
    }
    const response = await fetch('http://localhost:3000/emails', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    })
    modalSection.remove()
    num --
    alert("Email Salvo com sucesso")
  })

  const formInput = document.createElement("input")
  formInput.setAttribute("required", "")
  formInput.placeholder = "Type here your email"
  formInput.type = "email"
  formInput.id = "inputMail"

  const btnReceive = document.createElement("button")
  btnReceive.addEventListener("click", () => {
    
  })
  btnReceive.classList.add("btn")
  btnReceive.classList.add("btn-do-something")
  btnReceive.textContent = "Receive news"

  divFlex.append(userImg, btnClose)
  divText.append(h2)
  form.append(formInput, btnReceive)
  modalSection.append(divFlex, divText, form)
  document.body.append(modalSection, overlay)
})


function verifyEmail (email) {
  if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true
} else {
  return false
}
}
