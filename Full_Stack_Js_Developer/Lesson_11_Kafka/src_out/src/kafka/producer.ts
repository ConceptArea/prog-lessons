import {Producer, ProducerGlobalConfig} from "node-rdkafka";

class StationProducer extends Producer {
    constructor() {
        const config:ProducerGlobalConfig = {
            'metadata.broker.list': 'localhost:9092'
        };
        super(config, {})
        super
            .on("ready", () => console.log("startproducer"))
            .on("event.error", (error) => {
                throw error
            });
    }
    start() {
        super.connect();
        super.on("ready", () => console.log("connect"))
    }

    close() {
        super.disconnect();
    }

    sendStation(station){
        if (super.isConnected()){
            try{
                super.produce('station', null, Buffer.from(JSON.stringify(station)));
                console.log('Report sent to the consumer');
            }catch (error) {
                console.log(error);
            }
        } else {
            console.log('Produsec is not connected')
            setTimeout( () =>this.sendStation(station), 1000)
        }
    }
}
const stationProducer = new StationProducer()

export {stationProducer}