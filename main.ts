let lowestVol: number;
let highestVol: number;
let currentStr: string;
let translatedWords: string[];
let completedStr: string;
//  Imports go at the top
//  Initilization
hummingbird.startHummingbird()
let ascii = [[0, "\u0000"], [1, "\u0001"], [2, "\u0002"], [3, "\u0003"], [4, "\u0004"], [5, "\u0005"], [6, "\u0006"], [7, "\u0007"], [8, "\b"], [9, "\t"], [10, "\n"], [11, "\u000b"], [12, "\f"], [13, "\r"], [14, "\u000e"], [15, "\u000f"], [16, "\u0010"], [17, "\u0011"], [18, "\u0012"], [19, "\u0013"], [20, "\u0014"], [21, "\u0015"], [22, "\u0016"], [23, "\u0017"], [24, "\u0018"], [25, "\u0019"], [26, "\u001a"], [27, "\u001b"], [28, "\u001c"], [29, "\u001d"], [30, "\u001e"], [31, "\u001f"], [32, " "], [33, "!"], [34, "\""], [35, "#"], [36, "$"], [37, "%"], [38, "&"], [39, "'"], [40, "("], [41, ")"], [42, "*"], [43, "+"], [44, ","], [45, "-"], [46, "."], [47, "/"], [48, "0"], [49, "1"], [50, "2"], [51, "3"], [52, "4"], [53, "5"], [54, "6"], [55, "7"], [56, "8"], [57, "9"], [58, ":"], [59, ";"], [60, "<"], [61, "="], [62, ">"], [63, "?"], [64, "@"], [65, "A"], [66, "B"], [67, "C"], [68, "D"], [69, "E"], [70, "F"], [71, "G"], [72, "H"], [73, "I"], [74, "J"], [75, "K"], [76, "L"], [77, "M"], [78, "N"], [79, "O"], [80, "P"], [81, "Q"], [82, "R"], [83, "S"], [84, "T"], [85, "U"], [86, "V"], [87, "W"], [88, "X"], [89, "Y"], [90, "Z"], [91, "["], [92, "\\"], [93, "]"], [94, "^"], [95, "_"], [96, "`"], [97, "a"], [98, "b"], [99, "c"], [100, "d"], [101, "e"], [102, "f"], [103, "g"], [104, "h"], [105, "i"], [106, "j"], [107, "k"], [108, "l"], [109, "m"], [110, "n"], [111, "o"], [112, "p"], [113, "q"], [114, "r"], [115, "s"], [116, "t"], [117, "u"], [118, "v"], [119, "w"], [120, "x"], [121, "y"], [122, "z"], [123, "{"], [124, "|"], [125, "}"], [126, "~"], [127, ""]]
let baselinesSet = false
let bottomVol = 0
let topVol = 0
function getVolume(): number {
    if (baselinesSet != true) {
        return Math.trunc(hummingbird.getSensor(SensorType.Sound, ThreePort.One))
    } else {
        return bottomVol + hummingbird.getSensor(SensorType.Sound, ThreePort.One) * (topVol - bottomVol) / 100
    }
    
}

while (true) {
    lowestVol = getVolume()
    highestVol = getVolume()
    currentStr = ""
    translatedWords = []
    completedStr = ""
    basic.showString("-")
    for (let i = 0; i < 50; i++) {
        if (getVolume() > highestVol) {
            highestVol = getVolume()
        }
        
        if (getVolume() < lowestVol) {
            lowestVol = getVolume()
        }
        
    }
    if (highestVol - lowestVol > 5) {
        basic.showString("vol unstable")
    } else if (input.buttonIsPressed(Button.A)) {
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.showString("Ready...")
        while (true) {
            if (getVolume() > 40 && getVolume() < 60) {
                basic.showIcon(IconNames.Yes)
                basic.pause(500)
                bottomVol = getVolume()
                basic.pause(500)
                topVol = getVolume()
                if (topVol - bottomVol < 80) {
                    basic.showString("Noise too high")
                } else {
                    baselinesSet = true
                    while (true) {
                        if (getVolume() < 30) {
                            currentStr += "0"
                            basic.showString("0")
                        } else if (getVolume() > 70) {
                            currentStr += "1"
                            basic.showString("1")
                        } else if (getVolume() > 50 && getVolume() < 70) {
                            translatedWords.push(currentStr)
                            currentStr = ""
                            basic.showString("-")
                        } else if (getVolume() < 50 && getVolume() > 30) {
                            translatedWords.push(currentStr)
                            basic.showIcon(IconNames.Yes)
                            basic.pause(1800)
                            break
                        }
                        
                        basic.pause(200)
                    }
                    for (let j of translatedWords) {
                        completedStr += "" + ascii[parseInt(j.slice(0, 8), 2)]
                    }
                }
                
            }
            
        }
    }
    
}
