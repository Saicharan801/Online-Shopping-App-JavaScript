let productsElement = document.getElementById("productslist");
let cartElement = document.getElementById("cartlist");
let feedbackElement = document.getElementById("feedback");
let priceElement=document.getElementById("price");
let clearbtn=document.getElementById("claerbtn");
let sortbtn=document.getElementById("sortbtn");
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,

    },
    {
        id: 2,
        name: "TV",
        price: 20000,

    },
    {
        id: 3,
        name: "Washing Machine",
        price: 9000,

    },
    {
        id: 4,
        name: "Smart Watch",
        price: 18000,

    },
    {
        id: 5,
        name: "AC",
        price: 30000,

    }

]
const cart = [];
let timeout;

function productrundur(){
    // const{id,name,price}=products;
products.forEach(function (items) {
    //  <div class="products">
    //         <p>Laptop-50000 rs</p>
    //         <button>Add to cart</button>
    //     </div>
    // let itemElement=`<div class="productsClass">
    //     <p>${items.id}.${items.name}-${items.price} rs</p>
    //     <button>Add to cart</button></div>`
    //     productsElement.insertAdjacentHTML("beforeend",itemElement);
    let divElement = document.createElement("div");
    divElement.className = "productsClass";
    divElement.innerHTML = `<p>${items.id}.${items.name}-${items.price} rs</p>
         <button onclick="addCart(${items.id})">Add to cart</button></div>`;
    productsElement.appendChild(divElement);


});
}

function addCart(pid) {
    timeout = null;
    const productadded = products.find(function (product) {
        return product.id === pid;
    })
    const IsAvailableProd = cart.some((product) => product.id == pid);
    if (IsAvailableProd) {
        updatedmsg(`item already i cart`, "red");
        return;
    }
    console.log(productadded)
    cart.push(productadded);
    
    console.log(cart);
    rendur();
    
    
    updatedmsg(`${productadded.name} added to cart`, "green");
    timeout = setTimeout(function () {
        feedbackElement.style.display = "none";
    }, 3000)
}

function rendur() {
    cartElement.innerHTML = ""; // clear previous cart render
    cart.forEach(({ id, name, price }) => {
        let divElement = document.createElement("div");
        divElement.className = "productsClass";
        divElement.innerHTML = `
            <p>${name} - ${price} rs</p>
            <button onclick="removeCart(${id})">Remove</button>
        `;
        cartElement.appendChild(divElement);
    });
    // sum=0;
    // cart.forEach(function(values){
    //     sum+=values.price;

    // })
    let sum=cart.reduce(function(previous,current){
        return previous+current.price;
    },0)
    
    priceElement.textContent=`Total-${sum} rs/-`;
}
function removeCart(id) {
    const idIndex=cart.findIndex((product)=>product.id===id)
    const removeCart=cart[idIndex];
    cart.splice(idIndex,1)
    updatedmsg(`${removeCart.name} is removed from cart`,"green");
   
    rendur();
     
    // const updatedCart = cart.filter((product) => product.id !== id);
    // console.log(updatedCart);
}
function updatedmsg(msg, tcolor) {
    feedbackElement.style.display = "block";
    feedbackElement.style.backgroundColor = tcolor;
    feedbackElement.textContent = msg;
}
clearbtn.addEventListener("click",function(){
    cart.length=0;
    rendur();
})
sortbtn.addEventListener("click",function(){
    cart.sort(function(item1,item2){
        return item2.price-item1.price;
    })
    rendur();
})
productrundur();

