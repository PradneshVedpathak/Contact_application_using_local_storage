showData();
var indexOfEditBtn;

function addDataToLocal() {
  location.reload();
  var nameOfUser = document.getElementById("userName").value;
  var contactNumber = document.getElementById("userNumber").value;
  var objOfData = {
    name: nameOfUser,
    number: contactNumber,
  };

  if (localStorage.getItem("Data") == null) {
    localStorage.setItem("Data", "[]");
  }

  var localData = JSON.parse(localStorage.getItem("Data"));
  if (nameOfUser != "" && contactNumber != "") {
    localData.push(objOfData);
  }

  localStorage.setItem("Data", JSON.stringify(localData));

  document.getElementById("inputBox").value = "";
}

function showData() {
  var localData = JSON.parse(localStorage.getItem("Data"));
  console.log(localData);
  var table = document.getElementById("tbody");

  for (let i = 0; i < localData.length; i++) {
    var row = `<tr>
                  <th>${localData[i].name}</th>
                  <th>${localData[i].number}</th>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-outline-danger" onclick = "deleteTask(${i})">Delete</button>
                  <button class="btn btn-outline-info" onclick = "editTask(${i})">Edit</button>
                  </div>
                  <br><br>
               </tr>`;

    if (table != null) {
      table.innerHTML += row;
    }
  }
}

function deleteTask(e) {
  var localData = JSON.parse(localStorage.getItem("Data"));
  let updatedData = localData.filter((value, index) => {
    return index !== e;
  });
  localStorage.setItem("Data", JSON.stringify(updatedData));
  location.reload();
}

function editTask(e) {
  indexOfEditBtn = e;
  var addUserbtn = document.getElementById("addUserbtn");
  var updateUserBtn = document.getElementById("updateUserBtn");
  addUserbtn.disabled = true;
  updateUserBtn.disabled = false;

  var localData = JSON.parse(localStorage.getItem("Data"));
  document.getElementById("userName").value = localData[e].name;
  document.getElementById("userNumber").value = localData[e].number;
}

function updateTask() {
  var localData = JSON.parse(localStorage.getItem("Data"));
  localData[indexOfEditBtn].name = document.getElementById("userName").value;
  localData[indexOfEditBtn].number =
    document.getElementById("userNumber").value;
  localStorage.setItem("Data", JSON.stringify(localData));
  document.getElementById("userName").value = "";
  document.getElementById("userNumber").value = "";
  location.reload();
}
