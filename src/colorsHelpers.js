const ColorEnum = {
    BLACK: 0,
    WHITE: 3,
    RED: 5,
    ORANGE: 9,
    YELLOW: 13,
    LGREEN: 16,
    GREEN: 21,
    LBLUE: 37,
    BLUE: 41,
    PURPLE: 54,
    PINK: 52,
    CHERRY: 57

}

const buttonNumberLayout = [
    [81, 82, 83, 84, 85, 86, 87, 88],
    [71, 72, 73, 74, 75, 76, 77, 78],
    [61, 62, 63, 64, 65, 66, 67, 68],
    [51, 52, 53, 54, 55, 56, 57, 58],
    [41, 42, 43, 44, 45, 46, 47, 48],
    [31, 32, 33, 34, 35, 36, 37, 38],
    [21, 22, 23, 24, 25, 26, 27, 28],
    [11, 12, 13, 14, 15, 16, 17, 18],
]

const mainLayout = [
    ["WHITE", "BLACK", "WHITE", "RED", "ORANGE", "YELLOW", "GREEN", "LGREEN"],
    ["BLACK", "BLACK", "BLACK", "LBLUE", "BLUE", "PURPLE", "PINK", "CHERRY"],
    ["BLACK", "BLACK", "BLACK", "BLACK", "BLACK", "BLACK", "BLACK", "BLACK"],
    ["BLACK", "BLACK", "BLACK", "BLACK", "BLACK", "BLACK", "BLACK", "BLACK"],
    ["RED", "RED", "RED", "RED", "ORANGE", "ORANGE", "ORANGE", "ORANGE"],
    ["YELLOW", "YELLOW", "YELLOW", "YELLOW", "GREEN", "GREEN", "GREEN", "GREEN"],
    ["BLUE", "BLUE", "BLUE", "BLUE", "PURPLE", "PURPLE", "PURPLE", "PURPLE"],
    ["PINK", "PINK", "PINK", "PINK", "CHERRY", "CHERRY", "CHERRY", "CHERRY"],
]

// set the blinking period (in ms), 0 means no blinking
const blinkingPeriodLayout = [
    [0, 0, 800, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 800, 0, 0, 0, 0, 0],
]

// keep track of whether it is currently on or off
const blinkingState = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
]

function getButtonNumber(x, y) {
    if (y < mainLayout.length && x < mainLayout[0].length) {
        return buttonNumberLayout[y][x];
    }
}

function getButtonColor(x, y) {
    if (y < mainLayout.length && x < mainLayout[0].length) {
        return ColorEnum[mainLayout[y][x]];
    }
}


/**
 * This function initializes the Launchpad with
 * the main layout
 *
 * @param {*} output the webmidi output object
 */
function initLaunchpadColors(output) {
    // apply colors to launchpad
    for (let y = 0; y < mainLayout.length; y++) {
        for (let x = 0; x < mainLayout[0].length; x++) {
            const buttonNumber = getButtonNumber(x, y);
            const buttonColor = getButtonColor(x, y);
            output.send(144, [buttonNumber, buttonColor]);
        }
    }
}

function initLaunchpadBlinking(output) {
    for (let y = 0; y < blinkingPeriodLayout.length; y++) {
        for (let x = 0; x < blinkingPeriodLayout[0].length; x++) {
            const buttonBlinkingPeriod = blinkingPeriodLayout[y][x];

            if (buttonBlinkingPeriod != 0) 
                setInterval(
                    () => blinkingHelper(output, x, y), 
                    buttonBlinkingPeriod
                );
        }
    }
}

function blinkingHelper(output, x, y) {
    const buttonNumber = getButtonNumber(x, y);
    const buttonColor = getButtonColor(x, y);
    if (blinkingState[y][x] == 0) {
        blinkingState[y][x] = 1;
        output.send(144, [buttonNumber, buttonColor])
    } else {
        blinkingState[y][x] = 0;
        output.send(144, [buttonNumber, ColorEnum.BLACK])
    }
}