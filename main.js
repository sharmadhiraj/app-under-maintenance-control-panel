function connectFirebase() {
    console.log("Connect to firebase");
    firebase.initializeApp(getConfig());
    firebase.database().ref('/')
        .once('value')
        .then(function (snapshot) {
            fillUnderMaintenanceData(snapshot.val());
        });
}

function getConfig() {
    return {
        apiKey: apiKey,
        authDomain: projectID + ".firebaseapp.com",
        databaseURL: "https://" + projectID + ".firebaseio.com",
        storageBucket: projectID + ".appspot.com"
    }
}

function fillUnderMaintenanceData(data) {
    console.log(data);
    document.getElementById("is_under_maintenance").checked = data["is_under_maintenance"];
    document.getElementById("is_under_maintenance").disabled = false;
    document.getElementById("under_maintenance_message").value = data["under_maintenance_message"];
    document.getElementById("btn_update").disabled = false;
}

function updateUnderMaintenanceStatus(checkBox) {
    firebase.database().ref('/is_under_maintenance')
        .set(checkBox.checked);
}

function updateUnderMaintenanceMessage() {
    const message = document.getElementById("under_maintenance_message").value;
    firebase.database().ref('/under_maintenance_message')
        .set(message);
}

connectFirebase();