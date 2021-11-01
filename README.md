
# Tiny:bit

[Tiny:bit is a small and cute robot car for eductaion](https://category.yahboom.net/products/tinybit)

## Basic usage

* Set the speed and direction of Tiny:bit two motor

```blocks
Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 180)
Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, 180)
```

* Set the speed and of Tiny:bit single motor

```blocks
Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Run, 180, 180)
Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Back, 180, 180)
```

* Set the color of Tiny:bit searchlight

```blocks
Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
```

* Set the color of Tiny:bit two searchlight

```blocks
Tinybit.RGB_Car_Big2(255, 120, 150)
```

* Read ultrasonic sensor for Micro:bit V2

```blocks
basic.showNumber(Tinybit.Ultrasonic_CarV2())
```

* Read ultrasonic sensor for Micro:bit V1.5

```blocks
basic.showNumber(Tinybit.Ultrasonic_Car())
```

* Read voice sensor

```blocks
basic.showNumber(Tinybit.Voice_Sensor())
```

* Stop the Tiny:bit motor 

```blocks
Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
```



MIT




## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
