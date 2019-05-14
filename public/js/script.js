let form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
	event.preventDefault();
	let nameInp = document.querySelector(".name");
	let passInp = document.querySelector(".pass");
	fetch("http://localhost:3000/users", {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: nameInp.value,
			password: passInp.value
		})
	}).then((response) => {
	response.text().then((data) => console.log(data))
})
})