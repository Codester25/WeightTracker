/* Adds given button value to the password
  field 
*/
function addKey(key)
{
  var currVal=document.getElementById("passcode").value;
  if(key=="bksp")
  {
    document.getElementById("passcode").value = (currVal.substring(0,currVal.length-1));
  }  
  else
  {
    document.getElementById("passcode").value = (currVal.concat(key));
  }
}
// check password equal to default
function checkPass()
{
    //default password
	var pass = 1234
	var inputpass = document.getElementById("passcode").value
	if (inputpass == pass){
    if (document.getElementById("FirstName") == "")
    {
      window.location.href = "SignUp.html";
    }
    else
    {
      window.location.href = "Menu.html";
    }
		
	}
	else{
		alert("Incorrect Password. Please try again.")
	}
}
function drawDumbell()
{
  var canvas = document.getElementById("canvasElement");
  var canvasContext = canvas.getContext("2d");
  var x = 150

  // left weight
  drawRectangle(canvasContext, x, 70, 50, 60, "black");
  // handle
  drawRectangle(canvasContext, x + 50, 90, 87, 20, "grey");
  // right weight
  drawRectangle(canvasContext, x + 135, 70, 50, 60, "black");

}

function drawRectangle(canvasContext, x, y, width, height, color)
{
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

//store user input from information page.
function storeUser() {
	
  var FirstName = document.getElementById("FirstName").value;
  var LastName = document.getElementById("LastName").value;
  var birthDate = document.getElementById("birthDate").value;
  var password = document.getElementById("Password").value;
  var phone = document.getElementById("PhoneNumber").value;
  var gender = document.getElementById("Gender").value;

var userObj = {
      "FirstName" : FirstName, 
      "LastName" : LastName,     
      "birthDate" : birthDate,
      "Password" : password,
      "PhoneNumber" : phone,
      "Gender" : gender
    };
  
 try
  {
      localStorage.setItem("User", JSON.stringify(userObj));
  }
  catch(e)
  {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor==="Google Inc.")
      {
          if(e == DOMException.QUOTA_EXCEEDED_ERR) 
          {
            alert("Error: Local Storage limit exceeded.");
          }
      }
      else if(e == QUOTA_EXCEEDED_ERR){
          alert("Error: Loading from local storage.");
      }
   } 
  if (FirstName != "" &&  LastName != "" && birthDate != "" && password != "" &&
  phone != "" && gender != "")
  {    
  alert("You are signed up and your information is saved.")
  displayUser();
  }
  else
  {
  alert("Fill in ALL Fields Please.")
  }       
     
}

// display user information from information page
function displayUser() {
var User = JSON.parse(localStorage.getItem("User"));

  document.getElementById("savedFirstName").innerHTML = User.FirstName;
  document.getElementById("savedLastName").innerHTML = User.LastName;
  document.getElementById("savedBirthDate").innerHTML = User.birthDate;
  document.getElementById("savedPassword").innerHTML = User.Password;
  document.getElementById("savedPhone").innerHTML = User.PhoneNumber;
  document.getElementById("savedGender").innerHTML = User.Gender;
}

function displayName(){
  var User = JSON.parse(localStorage.getItem("User"));

  document.getElementById("savedFirstName").innerHTML = User.FirstName;
  document.getElementById("savedLastName").innerHTML = User.LastName;


}
// Removes all record of weight data from localStorage 
function clearWeightData() {
  localStorage.removeItem("weightData");
  alert("All weight entries have been deleted.");
};

// Removes all data from localStorage 
function clearAll() {
  localStorage.clear();
  alert("All information has been deleted.");
};

// adds weight entry to localStorage
const addData = e => {
	let weightData = JSON.parse(localStorage.getItem("weightData")) || [];	
	weightData.push({
		Weight: document.getElementById("Weight").value,
    weighDate: document.getElementById("weighDate").value,
		Goal: document.getElementById("Goal").value,
    Calories: document.getElementById("Calories").value,
	});
	localStorage.setItem("weightData", JSON.stringify(weightData));			
	e.preventDefault();
}

// displays the weight data in a table
function dispData()
{		
  var weightData = JSON.parse(localStorage.getItem("weightData"));
	if(localStorage.getItem("weightData"))
	{
		var output = document.querySelector("tbody");
		output.innerHTML == "";
		JSON.parse(localStorage.getItem("weightData")).forEach(element => 
		{
			output.innerHTML += `
					<tr>	
						<td>${element.weighDate}</td>	
            <td>${element.Weight}</td>							
            <td>${element.Goal}</td>	
						<td>${element.Calories}</td>													
					</tr>
			`;				
		});
    
	} 
  var Weight = weightData[0].Weight;
  var Goal = weightData[0].Goal;
  var current = weightData[weightData.length - 1].Weight;
  document.getElementById("savedWeight").innerHTML = Weight
  document.getElementById("savedGoal").innerHTML = Goal
  document.getElementById("current").innerHTML = current
  var percent = (Weight - current);
  console.log(percent)
  document.getElementById("percentage").innerHTML = percent 
}

function getHistory(weightArr, dateArr)
{
	var record = JSON.parse(localStorage.getItem("weightData"));

	for (var i=0; i < record.length; i++)
	{
		var date = new Date(record[i].weighDate);
		var m = date.getMonth() + 1;
		var d = date.getDate() + 1;

		dateArr[i]=(m + "/" + d);
		weightArr[i]=parseFloat(record[i].Weight);
	}
}

function getBound(lower, upper){
	var weightData = JSON.parse(localStorage.getItem("weightData"));
	var level = weightData.weightDataRange;
	//set upper bounds to an arbituary number like 40.
	if (level == "StageA")
	{
		upper[0] = upper[1] = 10;
		lower[0] = lower[1] = 0;		
	}
	else if (level == "StageB")
	{
		upper[0] = upper[1] = 10;
		lower[0] = lower[1] = 0;
	}
	else
	{
		upper[0] = upper[1] = 40;
		lower[0] = lower[1] = 0;
	}
}
function drawgraph(){
  if(localStorage.getItem("weightData") == null){
    window.location.href = "WeightEntry.html";
    alert("No weight Data entered.")
  }
	var canvas = document.getElementById("canvasGraph");  
  var context = canvas.getContext("2d");

	context.fillStyle="black";

	var weightArr = new Array();
	var dateArr = new Array();
	getHistory(weightArr, dateArr);

	var lower = new Array(2);
	var upper = new Array(2);
	getBound(lower, upper);
	
	console.log(weightArr);
	context.beginPath();  
  context.moveTo(0, 0);  
	drawlines(weightArr, upper, lower, dateArr);

  
  console.log(weightArr);
  console.log(dateArr);
  dispData();
  displayName();
  drawGoal();
}

function drawlines(weightArr, upper, lower, dateArr)
{
	var weightDataline = new RGraph.Line("canvasGraph", weightArr, upper, lower)
	.Set("labels", dateArr)
	.Set("colors", ["blue" ])
	.Set("shadow", true)
	.Set("shadow.offsetx", 1)
	.Set("shadow.offsety", 1)
	.Set("numxticks", 6)
	.Set("scale.decimals", 0)
	.Set("xaxispos", "bottom")
	.Set("gutter.left", 60)
	.Set("tickmarks", "filledcircle")
	.Set("ticksize", 5)	
	.Set("chart.title", "Progress Graph")
	.Draw();
}
function drawGoal()
{
  var canvas = document.getElementById("canvasGraph");  
  var canvasContext = canvas.getContext("2d");
  var weightData = JSON.parse(localStorage.getItem("weightData"));
  var Goal = weightData[weightData.length - 1].Goal;
  drawRectangle(canvasContext, 60, Goal, 780, 30, "green");
}