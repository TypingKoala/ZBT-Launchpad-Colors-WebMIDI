statusText = document.getElementById("status");
messageText = document.getElementById("message");

function init() {
    var output = WebMidi.getOutputByName("Launchpad MK2")
    var input = WebMidi.getInputByName("Launchpad MK2")
    if (!output || !input) {
        // check if either input or output connection failed
        statusText.innerHTML = "Connection failed."
        messageText.innerHTML = "Please connect the Launchpad and ensure you have the correct drivers."
    } else {
        statusText.innerHTML = "Connected to Novation Launchpad MK2."
        initLaunchpadColors(output);
        initLaunchpadBlinking(output);
        input.addListener('noteon', "all", function(e) {
            messageText.innerHTML = `${e.note.number} pressed.`;
        });
        input.addListener('noteoff', "all", function(e) {
            messageText.innerHTML = `${e.note.number} released.`;
        });
    }
}

WebMidi.enable(function (err) {
    if (err) {
        console.log("WebMidi could not be enabled.", err);
    }

    init(); // run init once
    WebMidi.addListener("connected", init); // run init if a new midi device is connected
});