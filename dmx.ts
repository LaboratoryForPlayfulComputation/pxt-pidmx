//% color=#ab86f9 weight=5 icon="\uf140"
namespace dmx {

    let numberFixtures = 0;
    let fixtures : Array<Fixture>= [];

    export class Fixture {
        public name : string;
        public numChannels : number;
        public channels : Array<Channel>;
        public redChannel : number;
        public greenChannel : number;
        public blueChannel : number;
        public RGBChannelsSet : boolean;

        constructor(fixtureName : string, numberChannels : number) {
            this.name = fixtureName;
            this.numChannels = numberChannels;
            for (let i = 0; i < this.numChannels; i++){
                this.channels.push(new Channel());
            }
            this.RGBChannelsSet = false;
        }
    }

    export class Channel {
        public value : number;

        constructor() {
            this.value = 0;
        }
    }
    
    /**
     * Initialize a new fixture in the DMX universe
     * @param name
     * @param numChannels
     */
    //% weight=90
    //% blockId=dmx_createfixture block="create fixture %name| with %numChannels| channels" blockGap=8
    export function createFixture(name: string, numChannels: number) {
        let initcommand = "addFixture:" + name + "," + numChannels.toString();
        serial.writeLine(initcommand);
        let fixtureName = numberFixtures.toString();
        fixtures.push(new Fixture(name, numChannels));
        numberFixtures++;
    }

    /**
     * Update value of a fixture's particular channel
     * @param name
     * @param channel
     * @param value
     */
    //% weight=90
    //% blockId=dmx_updatefixturechannel block="update fixture %name| channel %numChannels| to %value" blockGap=8
    export function updateFixtureChannel(name: string, channel: number, value: number) {
        let fixture = findFixtureByName(name);
        if (fixture){
            fixture.channels[channel].value = value;
            let updatecommand = "setChannelValue:" + name + "," + channel.toString() + "," + value.toString();
            serial.writeLine(updatecommand);
        }
    }

    /**
     * Set which channels are RGB channels for the fixture
     * @param name
     * @param redChannel
     * @param greenChannel
     * @param blueChannel
     */
    //% weight=90
    //% blockId=dmx_setRGBchannels block="fixture %name|'s RGB channels are red: %redChannel| green: %greenChannel| blue: %blueChannel" blockGap=8
    //% inlineInputMode="inline" 
    export function setRGBChannels(name: string, redChannel: number, greenChannel: number, blueChannel: number) {
        let fixture = findFixtureByName(name);
        if (fixture){
            fixture.redChannel = redChannel;
            fixture.greenChannel = greenChannel;
            fixture.blueChannel = blueChannel;
            fixture.RGBChannelsSet = true;
        }        
    }

    /**
     * Update color of fixture
     * @param name
     * @param color
     */
    //% weight=90
    //% blockId=dmx_updateFixtureChannel block="fixture %name| set color to %color" blockGap=8
    export function updateFixtureColor(name: string, color: number) {
        let fixture = findFixtureByName(name);
        if (fixture && fixture.RGBChannelsSet){
            let rgbValues = hexToRgb(color);
            let red = rgbValues[0];
            let green = rgbValues[1];
            let blue = rgbValues[2];
            fixture.channels[fixture.redChannel].value = red;
            fixture.channels[fixture.greenChannel].value = green;
            fixture.channels[fixture.blueChannel].value = blue;
            send();
        }        
    }

    /**
     * Send all channels to dmx controller
     */
    //% weight=90
    //% blockId=dmx_send block="send dmx" blockGap=8
    export function send(): void {
        serial.writeLine("updateChannels");
    }
    
    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% blockId="colors_rgb" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% advanced=false    
    //% weight=19
    //% blockGap=8
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    export function hexToRgb(hex: number): Array<number> {
        let r = (hex >> 16) & 255;
        let g = (hex >> 8) & 255;
        let b = hex & 255;
        return [r, g, b];
    }

    export function findFixtureByName(name: string) : Fixture {
        for (let i = 0; i < fixtures.length; i++){
            let fixture = fixtures[i];
            if (fixture.name == name){
                return fixture;
            }
        }
        return null;
    }

}