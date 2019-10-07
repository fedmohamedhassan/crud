let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let message = document.getElementById("message");
let btn = document.getElementById("addProduct");
let search = document.getElementById("search");
let index = 0;
let products;
// start get items from localStorage
if (localStorage.getItem("products") === null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
  display();
}
// end get items from localStorage
// start add and update products 
btn.onclick = function() {
   if (btn.innerHTML === "add product") {
    create();
   display();
   clearForm();
   } else {
       update();
   display();
   clearForm();
   }
};
// end add and update products
// start create products
function create() {
  let product = {
    name:productName.value,
    price:productPrice.value,    
    message:message.value,
  };
  products.push(product);
  localStorage.setItem("products",JSON.stringify(products));
}
// end create  products
// start display products
function display() {
  let box = "";
  for (let i = 0;i<products.length;i++) {
     box += `
               <div class="col-md-4 mb-5">
                  <div>
                          <img class="img-fluid" src="product.png"> 
                          <h2>${products[i].name}</h2>
                          <h3>${products[i].price}</h3>
                          <p>${products[i].message}</p>
                          <button class="btn btn-danger" onclick="del(${i})">delete</button>
                          <button class="btn btn-info" onclick="up(${i})">update</button>
                   </div>
               </div>
               
     
           `;
  }
  document.getElementById("rows").innerHTML = box;
}
// end display products
// clear form function 
function clearForm() {
  let inputs = document.getElementsByClassName("form-control");
  for (let i = 0;i<inputs.length;i++) {
      inputs[i].value = "";
  }
}
//end  clear form function 
// delete products function
function del(e) {
  products.splice(e,1);
  display();
  localStorage.setItem("products",JSON.stringify(products));
}
//end delete products function
// start search function
search.onkeyup = function() {
  ser(search.value);
};
function ser(a) {
  let boxO = "";
   for (let i = 0;i<products.length;i++) {
       if (products[i].name.includes(a)) {
           boxO += `
                  <div class="col-md-4 mb-5">
                  <div>
                  <img class="img-fluid" src="product.png">
                          <h2>${products[i].name}</h2>
                          <h3>${products[i].price}</h3>
                          <p>${products[i].message}</p>
                          <button class="btn btn-danger" onclick="del(${i})">delete</button>
                          <button class="btn btn-success" onclick="up(${i})">update</button>
                   </div>
               </div>
             `;
       }
   }
   if (a.length === 0) boxO = ""; 
   document.getElementById("firstRow").innerHTML = boxO;
}
// end search function
// start update function
function up(e) {
  btn.innerHTML = "update";
    productName.value = products[e].name;
    productPrice.value =products[e].price;    
    message.value = products[e].message;
    index = e;
}
function update() {
  products[index].name = productName.value;
  products[index].price = productPrice.value;
  products[index].message = message.value;
  localStorage.setItem("products",JSON.stringify(products));
  btn.innerHTML = "add product";
}