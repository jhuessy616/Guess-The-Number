let btn = document.querySelector("button")
console.log(btn)

btn.addEventListener("click", (e) => {
    e.preventDefault()
    
    console.log({
        email: e.target.form[0].value,
        name: e.target.form[1].value,
        message: e.target.form[2].value
    })
})
