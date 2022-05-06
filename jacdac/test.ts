let k = 0
let dk = 10
forever(() => {
    led.toggle(0, 0)
    modules.yahboomMotors.run(k, -k)
    modules.yahboomBackLeds.setBrightness(99)
    modules.yahboomFrontLeds.setBrightness(99)
    modules.yahboomBackLeds.setAll(0x0000ff)
    modules.yahboomFrontLeds.setAll(0xff0000)
    pause(100)
    modules.yahboomBackLeds.setAll(0xff0000)
    modules.yahboomFrontLeds.setAll(0x0000ff)
    //  basic.clearScreen()
    if (modules.yahboomLineLeft.brightness() > 0)
        led.plot(0, 1)
    if (modules.yahboomLineRight.brightness() > 0)
        led.plot(4, 1)
    //   music.playTone(440, 100)
    console.logValue(`distance`, modules.yahboomSonar.distance())
    console.logValue('sound', modules.yahboomMicrophone.soundLevel())
    led.plotBarGraph(modules.yahboomMicrophone.soundLevel(), 100)
    pause(100)
    k += dk
    if (Math.abs(k) > 100)
        dk = -dk
})

control.runInBackground(() => {
    modules.yahboomBackLeds.onConnected(() => {
        console.log("back light connected")
    })
})