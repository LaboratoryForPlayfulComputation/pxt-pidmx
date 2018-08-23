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

}