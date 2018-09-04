let light1 = ""
light1 = dmx.fixture(8)
serial.writeLine("setChannelValue:" + "0," + 3 + "," + 100)
serial.writeLine("setChannelValue:" + "0," + 4 + "," + 255)
serial.writeLine("updateChannels")
basic.forever(() => {
    serial.writeLine("setChannelValue:" + "0," + 6 + "," + 0)
    serial.writeLine("updateChannels")
    basic.pause(5)
    serial.writeLine("setChannelValue:" + "0," + 6 + "," + 255)
    serial.writeLine("updateChannels")
    basic.pause(5)
})
