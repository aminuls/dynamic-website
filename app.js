const carObject = {
   vehicle: "Car",
   imageURL: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
   vehicleTitle: function(){
      return "Transport Mood " + this.vehicle;
   },
   tax: 500,
   farePerKilo: 3,
   capacity: 5,
   description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam fuga inventore quis, quod nemo pariatur unde architecto iure officiis repellat!"
};
const bikeObject = {
   vehicle: "Bike",
   imageURL: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b3JiaWtlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
   vehicleTitle: function(){
      return "Transport Mood " + this.vehicle;
   },
   tax: 200,
   farePerKilo: 2,
   capacity: 1,
   description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam fuga inventore quis, quod nemo pariatur unde architecto iure officiis repellat!"
};
const busObject = {
   vehicle: "Bus",
   imageURL: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
   vehicleTitle: function(){
      return "Transport Mood " + this.vehicle;
   },
   tax: 1000,
   farePerKilo: 6,
   capacity: 30,
   description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam fuga inventore quis, quod nemo pariatur unde architecto iure officiis repellat!"
};
const servicesArray = [carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject,carObject, bikeObject, busObject];

function displayServices(service) {
   const mainSection = document.getElementById("main-section");
   const stringified = JSON.stringify(service);
   const vehicleTitle = service.vehicleTitle.toString();
   const div = document.createElement("div");
   div.innerHTML = `
      <div class="card mb-3" mx-auto style="max-width: 800px">
         <div class="row g-0">
            <div class="col-md-4">
               <img src=${service.imageURL} class="img-fluid rounded-start img" alt="Car" />
            </div>
            <div class="col-md-8">
               <div class="card-body">
                  <h5 class="card-title">${service.vehicleTitle()}</h5>
                  <p class="card-text">${service.description}</p>
                  <p class="card-text"><small class="text-muted">Fare per kilo: $${service.farePerKilo} | Capacity: ${service.capacity} People/${service.vehicle} </small></p>
                  <!-- Button trigger modal -->
                  <button type="button" class="btn btn-primary" onclick='handleBooking(${stringified},${vehicleTitle})' data-bs-toggle="modal" data-bs-target="#exampleModal">Book Now</button>
               </div>
            </div>
         </div>
      </div>`;
   mainSection.appendChild(div);
}
// displayServices(carObject);
// displayServices(busObject);
// displayServices(bikeObject);


function displayAllArticles(arr){
   for(let i=0; i<arr.length; i++){
      displayServices(arr[i]);
   }
}
displayAllArticles(servicesArray);

function handleBooking(service,vehicleTitle){
   const modalTitle = document.getElementById("exampleModalLabel");
   modalTitle.innerHTML = vehicleTitle.call(service);
   const stringified = JSON.stringify(service);
   const modalBody = document.getElementById('mod-body');
   modalBody.innerHTML = `
      <div class="card mx-auto border-0" style="width: 100%">
         <img src=${service.imageURL} class="card-img-top" alt="..." />
         <div class="card-body">
            <h5 class="card-title">Vehicle Mood: ${service.vehicle}</h5>
            <p class="card-text mb-2">${service.description}</p>
            <p class="card-text fs-6 text-warning mb-0">Fare per kilo: $${service.farePerKilo}</p>
            <p class="card-text fs-6 text-warning mb-2">${service.capacity} People/${service.vehicle}</p>
            <p class="card-text fs-3 text-info mb-0">Fare: <span id="fare">--</span></p>
            <p class="card-text fs-3 text-info mb-0">Tax: <span id="tax">${service.tax}</span></p>
            <p class="card-text fs-3 text-info mb-2">Total-cost: <span id="total-cost">--</span></p>
            <div class="d-flex flex-wrap">
               <input class="my-2 me-2" id="distance-input" type="number" placeholder="Distance to Travel"/>
               <input class="my-2" id="quantity-input" type="number" placeholder="How many vehicle needs?"/>
               <button class="btn btn-outline-danger" type="submit" onclick='calculateCost(${stringified})'>Submit</button>
            </div>
         </div>
      </div>`
}

function calculateCost(service){
   const quantity = document.getElementById("quantity-input").value;
   const distance = document.getElementById("distance-input").value;
   const tax = document.getElementById("tax").innerText==="--" ? 0 : document.getElementById("tax").innerText;
   const fare = document.getElementById("fare");
   if(quantity>0 && distance>0){
      const totalCost = document.getElementById("total-cost");
      fare.innerText = quantity * distance * service.farePerKilo;
      totalCost.innerText = (quantity * distance * service.farePerKilo) + parseFloat(tax);
   }
}
// made searching process //
document.getElementById("search-btn").addEventListener('click', function(){
   document.getElementById("main-section").innerHTML ='';
   const searchValue = document.getElementById("search-field").value;
   for(let i=0; i<servicesArray.length; i++){
      if(servicesArray[i].description.toLowerCase().includes(searchValue.toLowerCase()) || servicesArray[i].vehicleTitle().toLowerCase().includes(searchValue.toLowerCase())){
         displayServices(servicesArray[i]);
      }
      // you can't use else here!!
      /* else{
         document.getElementById("main-section").innerHTML =`
         <div class="d-flex align-items-center justify-content-center" style="min-height: 300px">
            <p class="fs-1">Your search - <span class="h1">"${searchValue}"</span> - did not match any documents.</p>
         </div>
         `;
      } */
   }
   if(document.getElementById("main-section").innerHTML ===''){
      document.getElementById("main-section").innerHTML =`
         <div class="d-flex align-items-center justify-content-center" style="min-height: 300px">
            <p class="fs-1">Your search - <span class="h1">"${searchValue}"</span> - did not match any documents.</p>
         </div>
         `;
   }
})