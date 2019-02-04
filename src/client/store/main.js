import { decorate, observable } from "mobx";

class MainStore {
    @observable hello = "World"
}

export default new MainStore()