//% deprecated
namespace Tinybit {

}

//% deprecated
namespace neopixel {

}

// disable Jacdac single wire serial on pin 12
// as neopixel are already mounted on this pin
namespace userconfig { export const PIN_JACK_TX = 0xdead }

namespace modules {
    /**
     * Yahboom back LEDs
     */
    //% fixedInstance whenUsed block="yahboom back leds"
    export const yahboomBackLeds = new LedClient("yahboom back LEDs?dev=self&num_pixels=2&variant=Stick&srvo=0")

    /**
     * Yahboom front LEDs
     */
    //% fixedInstance whenUsed block="yahboom front leds"
    export const yahboomFrontLeds = new LedClient("yahboom front LEDs?dev=self&num_pixels=1&variant=Stick&srvo=1&leds_per_pixel=2")

    /**
     * Left line detector
     */
    //% fixedInstance whenUsed block="yahboom line left"
    export const yahboomLineLeft = new ReflectedLightClient("yahboom line left?dev=self&variant=InfraredDigital&svro=0")

    /**
     * Left line detector
     */
    //% fixedInstance whenUsed block="yahboom line right"
    export const yahboomLineRight = new ReflectedLightClient("yahboom line right?dev=self&variant=InfraredDigital&svro=1")

    /**
     * Sonar sensor
     */
    //% fixedInstance whenUsed block="yahboom sonar"
    export const yahboomSonar = new DistanceClient("yahboom sonar?dev=self&variant=sonar")

    /**
     * Microphone sound level sensor
     */
    //% fixedInstance whenUsed block="yahboom microphone"
    export const yahboomMicrophone = new SoundLevelClient("yahboom microphone?dev=self")
}

namespace servers {
    const PWM_ADD = 0x01
    const MOTOR = 0x02
    const RGB = 0x01

    function setPwmRGB(red: number, green: number, blue: number, brightness: number): void {
        const buf = pins.createBuffer(4);
        buf[0] = RGB;
        buf[1] = Math.round(red * brightness / 0xff);
        buf[2] = Math.round(green * brightness / 0xff);
        buf[3] = Math.round(blue * brightness / 0xff);
        pins.i2cWriteBuffer(PWM_ADD, buf);
    }

    function start() {
        jacdac.productIdentifier = 0x345f8369
        jacdac.deviceDescription = "Yahboom TinyBit"
        jacdac.startSelfServers(() => {
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
            const ledServer = new jacdac.LedServer(2, jacdac.LedPixelLayout.RgbGrb,
                (pixels, brightness) =>
                    light.sendWS2812BufferWithBrightness(pixels, DigitalPin.P12, brightness)
                ,
                {
                    variant: jacdac.LedVariant.Stick
                }
            )
            const pwmLedServer = new jacdac.LedServer(1, jacdac.LedPixelLayout.RgbRgb,
                (pixels, brightness) => {
                    console.log(pixels.toHex() + " " + brightness)
                    setPwmRGB(pixels[0], pixels[1], pixels[2], brightness)
                }, {
                variant: jacdac.LedVariant.Stick
            }
            )
            const servers: jacdac.Server[] = [
                ledServer,
                pwmLedServer,
                jacdac.createSimpleSensorServer(jacdac.SRV_REFLECTED_LIGHT,
                    jacdac.ReflectedLightRegPack.Brightness,
                    () => Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) ? 1 : 0,
                    {
                        variant: jacdac.ReflectedLightVariant.InfraredDigital
                    }),
                jacdac.createSimpleSensorServer(jacdac.SRV_REFLECTED_LIGHT,
                    jacdac.ReflectedLightRegPack.Brightness,
                    () => Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White) ? 1 : 0,
                    {
                        variant: jacdac.ReflectedLightVariant.InfraredDigital,
                        streamingInterval: 100
                    }),
                jacdac.createSimpleSensorServer(jacdac.SRV_DISTANCE,
                    jacdac.DistanceRegPack.Distance,
                    () => Tinybit.Ultrasonic_Car() / 100.0, {
                    variant: jacdac.DistanceVariant.Ultrasonic,
                    streamingInterval: 100
                }
                ),
                jacdac.createSimpleSensorServer(jacdac.SRV_SOUND_LEVEL,
                    jacdac.SoundLevelRegPack.SoundLevel,
                    () => Tinybit.Voice_Sensor() / 400, {
                        streamingInterval: 100
                    })
            ]
            return servers
        })
    }
    start()
}