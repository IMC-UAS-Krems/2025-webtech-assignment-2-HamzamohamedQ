var data = [
    { id: 1, title: "Family Food Box", cost: 25 },
    { id: 2, title: "Clean Water Kit", cost: 50 },
    { id: 3, title: "School Supplies", cost: 15 },
    { id: 4, title: "Medical Kit", cost: 30 },
    { id: 5, title: "Winter Coat", cost: 40 },
    { id: 6, title: "Warm Blanket", cost: 20 },
    { id: 7, title: "Shoes", cost: 35 }
];

var cart = [];


window.onload = function () {
    console.log("website ready");

   
    document.getElementById("goCheckout").addEventListener("click", function () {
        

        var m = document.getElementById('myModal');
        var modalInstance = bootstrap.Modal.getInstance(m);
        modalInstance.hide();

        
        document.getElementById("mainPage").style.display = "none";
        document.getElementById("checkPage").style.display = "block";

       
        loadSummary();
        window.scrollTo(0, 0);
    });

   
    document.getElementById("myForm").addEventListener("submit", checkForm);
}


function add(id) {
    var item = null;

    
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            item = data[i];
        }
    }

  
    cart.push(item);
    document.getElementById("cartNum").innerText = cart.length;

    
    var ul = document.getElementById("modalList");
    ul.innerHTML = "";
    for (let j = 0; j < cart.length; j++) {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";
        li.innerHTML = `<span>${cart[j].title}</span> <span>$${cart[j].cost}</span>`;
        ul.appendChild(li);
    }
}


function goHome() {
    document.getElementById("mainPage").style.display = "block";
    document.getElementById("checkPage").style.display = "none";
    document.getElementById("donePage").style.display = "none";
}


function loadSummary() {
    var list = document.getElementById("summary");
    list.innerHTML = "";
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var p = cart[i];
        total = total + p.cost;
        list.innerHTML += `<li class="list-group-item d-flex justify-content-between"><span>${p.title}</span> <span>$${p.cost}</span></li>`;
    }
    list.innerHTML += `<li class="list-group-item active d-flex justify-content-between"><strong>Total</strong> <strong>$${total}</strong></li>`;
}


function checkForm(e) {
    e.preventDefault();

    var ph = document.getElementById("uPhone").value;
    var zip = document.getElementById("uZip").value;

    
    if (isNaN(ph)) {
        alert("Error: Phone must be numbers");
        return;
    }
    if (zip.length > 6) {
        alert("Error: Zip code too long");
        return;
    }

    
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
        sum += cart[i].cost;
    }

    var disc = 0;
   
    if (cart.length >= 3) {
        disc = sum * 0.1;
    }

    var tax = (sum - disc) * 0.15;
    var final = (sum - disc) + tax;

    
    document.getElementById("checkPage").style.display = "none";
    document.getElementById("donePage").style.display = "block";
    window.scrollTo(0, 0);

    document.getElementById("receipt").innerHTML = `
        <p><strong>Subtotal:</strong> $${sum.toFixed(2)}</p>
        <p class="text-danger"><strong>Discount:</strong> -$${disc.toFixed(2)}</p>
        <p><strong>Tax (15%):</strong> $${tax.toFixed(2)}</p>
        <hr>
        <h3 class="text-success">Paid: $${final.toFixed(2)}</h3>
    `;
}

