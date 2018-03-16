import {ProductService} from '../product-service'

export class DeviceHistoriesService extends ProductService {

    constructor() {
        super()
    }

    getEndpoint() {
        return ['smart', 'devicehistories'];
    }

    getEventTargets() {
        return [];
    }

}

DeviceHistoriesService.Uid = (['smart', 'devicehistories']).join('.');