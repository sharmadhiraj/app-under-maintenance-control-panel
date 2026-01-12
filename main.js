function connectFirebase() {
    console.log("Connecting to Firebase...");
    firebase.initializeApp(getConfig());

    firebase.database().ref('/').on('value', snapshot => {
        fillUnderMaintenanceData(snapshot.val());
    });
}

function getConfig() {
    return {
        apiKey: apiKey,
        authDomain: `${projectID}.firebaseapp.com`,
        databaseURL: `https://${projectID}.firebaseio.com`,
        projectId: projectID
    };
}

function fillUnderMaintenanceData(data) {
    console.log("Fetched data:", data);

    const statusCheckbox = document.getElementById("is_under_maintenance");
    const messageTextarea = document.getElementById("under_maintenance_message");
    const updateButton = document.getElementById("btn_update");

    statusCheckbox.checked = data?.is_under_maintenance || false;
    statusCheckbox.disabled = false;

    messageTextarea.value = data?.under_maintenance_message || "";
    updateButton.disabled = false;
}

function updateUnderMaintenanceStatus(checkBox) {
    firebase.database().ref('/is_under_maintenance')
        .set(checkBox.checked)
        .then(() => console.log("Maintenance status updated"))
        .catch(err => console.error("Error updating status:", err));
}

function updateUnderMaintenanceMessage() {
    const message = document.getElementById("under_maintenance_message").value;
    firebase.database().ref('/under_maintenance_message')
        .set(message)
        .then(() => console.log("Maintenance message updated"))
        .catch(err => console.error("Error updating message:", err));
}

connectFirebase();
