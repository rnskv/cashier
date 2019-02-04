import { decorate, observable, action } from "mobx";

class MainStore {
    @observable hello = "World";

    @action
    setHello = () => {
        this.hello = 'mobX';
    }
}

export default new MainStore()