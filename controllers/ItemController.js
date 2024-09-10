const { Item } = require("../models");

class ItemController {
  static async getItem(req, res, next) {
    try {
      const allItem = await Item.findAll();
      res.status(200).json(allItem);
    } catch (err) {
      next(err);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      Item.destroy({ where: { id } });
      res.status(200).json({ message: "Item delete success" });
    } catch (err) {
      next(err);
    }
  }

  static async addItem(req, res, next) {
    try {
      const {
        name,
        purchaseDate,
        image,
        unitCode,
        status,
        type,
        warrantyExpired,
        description,
        serialNumber,
        productionYear,
        assignedFor,
      } = req.body;
      const item = await Item.create({
        name,
        purchaseDate,
        image,
        unitCode,
        status,
        type,
        warrantyExpired,
        description,
        serialNumber,
        productionYear,
        assignedFor,
      });
      res.status(201).json({ message: `${item.name} has been created` });
    } catch (err) {
      next(err);
    }
  }

  static async editItem(req, res, next) {
    try {
      const { id } = req.params;
      let item = await Item.findByPk(id);
      if (!item) {
        throw {
          code: 400,
          name: "Bad Request",
          message: `item id ${req.params.id} not found`,
        };
      } else {
        let {
          name,
          purchaseDate,
          image,
          unitCode,
          status,
          type,
          warrantyExpired,
          description,
          serialNumber,
          productionYear,
          assignedFor,
        } = req.body;
        let update = await Item.update(
          {
            name,
            purchaseDate,
            image,
            unitCode,
            status,
            type,
            warrantyExpired,
            description,
            serialNumber,
            productionYear,
            assignedFor,
          },
          {
            where: {
              id,
            },
          }
        );
        res.status(200).json(update);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      Item.destroy({ where: { id } });
      res.status(200).json({ message: "Item delete success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ItemController;
