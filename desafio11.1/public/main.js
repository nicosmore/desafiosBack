const socket = io();

const prod = document.getElementById("productos");
const prodForm = document.getElementById("productsForm");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");
const headerForm = document.getElementById("userHeader");

prodForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const name = nameInput.value
    const price = parseFloat(priceInput.value)
    const image = imageInput.value
    const newProduct = {
        name, 
        price, 
        image
    }   

    socket.emit("newProduct", newProduct)
    nameInput.value ="";
    priceInput.value ="";
    imageInput.value ="";    
});

socket.on("header",(nameUser)=>{
    console.log(nameUser);
    fetch('header.hbs')
    .then((data) =>data.text())
        .then((serverTemplate) =>{                        
            const template = Handlebars.compile(serverTemplate);
            const html = template({nameUser});
            headerForm.innerHTML = html;
        })  
});

socket.on('products', (products) => {     
     fetch('vista.hbs')
        .then((data) =>data.text())
        .then((serverTemplate) =>{ 
            console.log({products});           
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            prod.innerHTML = html;
        })  
});







