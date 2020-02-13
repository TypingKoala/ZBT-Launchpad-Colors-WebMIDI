WebMidi.enable(function (err) {
    if (err) {
        console.log("WebMidi could not be enabled.", err);
    } else {
        console.log("WebMidi enabled!");
    }
    var output = WebMidi.getOutputByName("Launchpad MK2")
    var input = WebMidi.getInputByName("Launchpad MK2")

    initLaunchpadColors(output);
    initLaunchpadBlinking(output);

    input.addListener('noteon', "all", function(e) {
        console.log(e.note.number);
    });

});