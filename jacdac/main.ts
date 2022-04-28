//% deprecated
namespace Tinybit {

}

//% deprecated
namespace neopixel {

}

namespace modules {
    /**
     * Yahboom back LEDs
     */
    //% fixedInstance whenUsed block="yahboom back leds"
    export const yahboomBackLeds = new LedClient("yahboom back LEDs?dev=self&num_pixels=2&variant=stick&svro=0")
    /**
     * Yahboom front LEDs
     */
    //% fixedInstance whenUsed block="yahboom front leds"
    export const yahboomFrontLeds = new LedClient("yahboom front LEDs?dev=self&num_pixels=1&variant=stick&svro=1")
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
            const ledServer = new jacdac.LedServer(2, jacdac.LedPixelLayout.RgbGrb,
                (pixels, brightness) => light.sendWS2812BufferWithBrightness(pixels, DigitalPin.P12, brightness),
                {
                    variant: jacdac.LedVariant.Stick
                }
            )
            const pwmLedServer = new jacdac.LedServer(1, jacdac.LedPixelLayout.RgbRgb,
                (pixels, brightness) => {
                    setPwmRGB(pixels[0], pixels[1], pixels[2], brightness)
                }, {
                variant: jacdac.LedVariant.Stick
            }
            )
            const servers: jacdac.Server[] = [
                ledServer,
                pwmLedServer
            ]
            return servers
        })
    }
    start()
}