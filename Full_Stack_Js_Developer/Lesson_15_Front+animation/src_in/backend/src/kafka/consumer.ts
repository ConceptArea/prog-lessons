import {KafkaConsumer, ConsumerGlobalConfig} from "node-rdkafka";

class StationConsumer extends KafkaConsumer {
    constructor () {
        const config:ConsumerGlobalConfig = {
            'group.id': 'kafka',
            'metadata.broker.list': 'localhost:9092'
        }
        super(config, {})
        super.on("ready", () =>{
            super.subscribe(['station'])
            super.consume()
            console.log('Listen station')
        }).on("rebalance", ()=> console.log('rebalance kafka'))
            .on("data", ({value})=>{
                console.log(JSON.parse(value.toString()),`Consumer data`)
            })
    }
    start() {
        super.connect();
    }

    close() {
        super.disconnect();
    }
}

export const stationConsumer = new StationConsumer()