import ModelUtils from '../models/utils';

export default class {
    constructor(model) {
        this.model = model;
    }

    async findById(id) {
        return this.model.findByPk(id);
    }

    async findByIds(ids) {
        // todo better way to do this?
        return this.findAll({ id: ids });
    }

    async findAll(query) {
        const found = await this.model.findAll(ModelUtils.buildWhere(query));
        // ensure undefined or null is never returned
        return found ? found : [];
    }

    async createOne(obj) {
        return this.model.create(obj);
    }

    async createMany(objs) {
        return this.model.bulkCreate(objs);
    }
}