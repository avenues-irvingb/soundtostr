# Imports go at the top
from microbit import *

# Initilization
hummingbird.start_hummingbird()

ascii = [
    (0, '\x00'), (1, '\x01'), (2, '\x02'), (3, '\x03'), (4, '\x04'), (5, '\x05'), (6, '\x06'), (7, '\x07'),
    (8, '\x08'), (9, '\x09'), (10, '\x0A'), (11, '\x0B'), (12, '\x0C'), (13, '\x0D'), (14, '\x0E'), (15, '\x0F'),
    (16, '\x10'), (17, '\x11'), (18, '\x12'), (19, '\x13'), (20, '\x14'), (21, '\x15'), (22, '\x16'), (23, '\x17'),
    (24, '\x18'), (25, '\x19'), (26, '\x1A'), (27, '\x1B'), (28, '\x1C'), (29, '\x1D'), (30, '\x1E'), (31, '\x1F'),
    (32, ' '), (33, '!'), (34, '"'), (35, '#'), (36, '$'), (37, '%'), (38, '&'), (39, '\''),
    (40, '('), (41, ')'), (42, '*'), (43, '+'), (44, ','), (45, '-'), (46, '.'), (47, '/'),
    (48, '0'), (49, '1'), (50, '2'), (51, '3'), (52, '4'), (53, '5'), (54, '6'), (55, '7'),
    (56, '8'), (57, '9'), (58, ':'), (59, ';'), (60, '<'), (61, '='), (62, '>'), (63, '?'),
    (64, '@'), (65, 'A'), (66, 'B'), (67, 'C'), (68, 'D'), (69, 'E'), (70, 'F'), (71, 'G'),
    (72, 'H'), (73, 'I'), (74, 'J'), (75, 'K'), (76, 'L'), (77, 'M'), (78, 'N'), (79, 'O'),
    (80, 'P'), (81, 'Q'), (82, 'R'), (83, 'S'), (84, 'T'), (85, 'U'), (86, 'V'), (87, 'W'),
    (88, 'X'), (89, 'Y'), (90, 'Z'), (91, '['), (92, '\\'), (93, ']'), (94, '^'), (95, '_'),
    (96, '`'), (97, 'a'), (98, 'b'), (99, 'c'), (100, 'd'), (101, 'e'), (102, 'f'), (103, 'g'),
    (104, 'h'), (105, 'i'), (106, 'j'), (107, 'k'), (108, 'l'), (109, 'm'), (110, 'n'), (111, 'o'),
    (112, 'p'), (113, 'q'), (114, 'r'), (115, 's'), (116, 't'), (117, 'u'), (118, 'v'), (119, 'w'),
    (120, 'x'), (121, 'y'), (122, 'z'), (123, '{'), (124, '|'), (125, '}'), (126, '~'), (127, '\x7F')
]

def getVolume():
    return int(hummingbird.get_sensor(SensorType.SOUND, ThreePort.ONE))
while True:
    lowestVol = getVolume()
    highestVol = getVolume()
    currentStr = ""
    translatedWords = []
    completedStr = ""

    basic.show_string("-")

    for i in range(50):
        if getVolume() > highestVol:
            highestVol = getVolume()
        if getVolume() < lowestVol:
            lowestVol = getVolume()

    if (highestVol - lowestVol) > 5:
        basic.show_string("vol unstable")
    elif input.button_is_pressed(Button.A):
        basic.show_icon(IconNames.YES)
        basic.pause(1000)
        basic.show_string("Ready...")

        if getVolume() > 40 and getVolume() < 60:
            basic.show_icon(IconNames.YES)
            basic.pause(500)

            while True:
                if getVolume() < 30:
                    currentStr += "0"
                    basic.show_string("0")
                elif getVolume() > 70:
                    currentStr += "1"
                    basic.show_string("1")
                elif getVolume() > 50 and getVolume() < 70:
                    translatedWords.append(currentStr)
                    currentStr = ""
                    basic.show_string("-")
                else:
                    translatedWords.append(currentStr)
                    basic.show_icon(IconNames.YES)
                    basic.pause(1800)
                    break
                basic.pause(200)
            for j in translatedWords:
                completedStr += str(ascii[int(j[:8], 2)])

            


            