//% deprecated
namespace Tinybit {

}

namespace modules {

}

namespace servers {
    function start() {
        jacdac.productIdentifier = 0x345f8369
        jacdac.deviceDescription = "Yahboom TinyBit"
        jacdac.startSelfServers(() => {
            const servers: jacdac.Server[] = [
                
            ]
            return servers
        })
    }
    start()
}