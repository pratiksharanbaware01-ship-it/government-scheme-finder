function recommendScheme() {

    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let occupation = document.getElementById("occupation").value;
    let category = document.getElementById("category").value;

    let result = "";

    if (occupation === "Farmer") {
        result = `
        <h3>Recommended Scheme</h3>
        <p>🌾 PM Kisan Yojana</p>
        <p>🌾 PM Fasal Bima Yojana</p>
        `;
    }
    else if (occupation === "Student") {
        result = `
        <h3>Recommended Scheme</h3>
        <p>🎓 National Scholarship</p>
        <p>🎓 PM Internship Scheme</p>
        `;
    }
    else if (gender === "Female") {
        result = `
        <h3>Recommended Scheme</h3>
        <p>👩 Mukhyamantri Majhi Ladki Bahin Yojana</p>
        <p>👧 Sukanya Samriddhi Yojana</p>
        `;
    }
    else if (age >= 60) {
        result = `
        <h3>Recommended Scheme</h3>
        <p>👴 Atal Pension Yojana</p>
        <p>👴 Senior Citizen Welfare Scheme</p>
        `;
    }
    
    else if (category === "Health") {
    result = `
    <h3>Recommended Scheme</h3>
    <p>🏥 Ayushman Bharat</p>
    `;
}
else if (category === "Housing") {
    result = `
    <h3>Recommended Scheme</h3>
    <p>🏠 PM Awas Yojana</p>
    `;
}
else {
    result = `
    <h3>Recommended Scheme</h3>
    <p>🏠 PM Awas Yojana</p>
    <p>🏥 Ayushman Bharat</p>
    `;
}

    const output = document.getElementById("recommendResult");
output.style.display = "block";
output.innerHTML = result;
}