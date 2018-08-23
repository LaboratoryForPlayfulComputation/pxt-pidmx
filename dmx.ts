//% color=#ab86f9 weight=5 icon="\uf140"
namespace dmx {

    let numberFixtures = 0;

    /**
     * Init new fixture
     * @param numChannels
     */
    //% weight=90
    //% blockId=dmx_initfixture block="fixture with %numChannels| channels" blockGap=8
    export function fixture(numChannels: number): string {
        let initcommand = "addFixture:" + numChannels.toString();
        serial.writeLine(initcommand);
        let fixtureName = "fixture:" + numberFixtures.toString();
        numberFixtures++;
        return fixtureName;
    }

    /**
     * Update fixture channel's value
     * @param fixture
     * @param channel
     * @param value
     */
    //% weight=90
    //% blockId=dmx_updatechannel block="%fixture| update channel %channel| to %value" blockGap=8
    export function updateChannel(fixture: string, channel: number, value: number): void {
        let fixtureNum = (fixture as any).split(":")[1];
        let updatecommand = "setChannelValue:" + fixtureNum.toString() + "," + channel.toString() + "," + value.toString();
        serial.writeLine(updatecommand);
    }

    /**
     * Send all channels to dmx controller
     */
    //% weight=90
    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void {
        serial.writeLine("updateChannels");
    }

    
}